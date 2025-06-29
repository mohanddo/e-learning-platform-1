import React, { useState } from "react";
import AnnouncementC from "./Announcement";
import { useCourse } from "@/context/CourseContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateComponent from "@/components/ui/CreateComponent";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { CreateOrUpdateAnnouncement } from "@/types/request";
import showAlert from "@/components/ui/AlertC";

function CourseAnnouncementsList({ role }: { role: "student" | "teacher" }) {
  const { course, refetch } = useCourse();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");

  const handleCreateAnnouncement = () => {
    setShowCreateForm(true);
  };

  const createAnnouncementMutation = useMutation({
    mutationFn: async () => {
      const request: CreateOrUpdateAnnouncement = {
        courseId: course!.id,
        text: announcementText,
        announcementId: null,
      };
      await courseApi.createOrUpdateAnnouncement(request);
    },
    onSuccess: async () => {
      setShowCreateForm(false);
      setAnnouncementText("");
      await refetch();
    },
    onError: () => {
      setShowCreateForm(false);
      showAlert(
        "warning",
        "Failed to create the announcement. Please try again."
      );
    },
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Create Announcement Button - Only for Teachers */}
      {role === "teacher" && (
        <Button
          onClick={handleCreateAnnouncement}
          className="flex items-center gap-2 bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white"
        >
          <Plus className="h-4 w-4" />
          Create Announcement
        </Button>
      )}

      {course!.announcements.map((announcement) => (
        <AnnouncementC announcement={announcement} key={announcement.id} />
      ))}

      {/* Empty State */}
      {course!.announcements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No announcements yet.</p>
          {role === "teacher" && (
            <p className="text-sm mt-2">
              Click &quot;Create Announcement&quot; to add your first
              announcement.
            </p>
          )}
        </div>
      )}

      {/* Create Announcement Modal */}
      {showCreateForm && (
        <CreateComponent
          onClose={() => setShowCreateForm(false)}
          onChange={(text: string) => setAnnouncementText(text)}
          mutation={createAnnouncementMutation}
          title="Create Announcement"
          placeHolder="Enter your announcement..."
        />
      )}
    </div>
  );
}

export default CourseAnnouncementsList;
