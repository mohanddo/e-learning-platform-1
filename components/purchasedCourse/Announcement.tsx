import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "@/components/ui/profile-image";
import { Announcement, AnnouncementComment } from "@/types/types";
import { getRelativeTimeFromNow } from "@/utils";
import AnnouncementComments from "./AnnouncementComments";
import CommentInput from "./CommentInput";
import { courseApi } from "@/api/course.api";
import UpdateAnnouncementComment from "./UpdateAnnouncementComment";
import { useCourse } from "@/context/CourseContext";
import DeleteComponent from "../ui/DeleteComponent";
import UpdateComponent from "../ui/UpdateComponent";
import { useMutation } from "@tanstack/react-query";
import showAlert from "../ui/AlertC";
import { Trash2, Edit } from "lucide-react";
import { Button } from "../ui/button";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

interface AnnouncementCProps {
  announcement: Announcement;
}

function AnnouncementC({ announcement }: AnnouncementCProps) {
  const [showComments, setShowComments] = useState(false);

  const { refetch, course } = useCourse();
  const isMounted = useRef<boolean | undefined>(undefined);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [showUpdateComponent, setShowUpdateComponent] = useState(false);
  const [commentToBeDeleted, setCommentToBeDeleted] =
    useState<AnnouncementComment | null>(null);
  const [commentToBeUpdated, setCommentToBeUpdated] =
    useState<AnnouncementComment | null>(null);
  const [showDeleteAnnouncement, setShowDeleteAnnouncement] = useState(false);
  const [showUpdateAnnouncement, setShowUpdateAnnouncement] = useState(false);
  const [announcementText, setAnnouncementText] = useState(announcement.text);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const updateAnnouncementMutation = useMutation({
    mutationFn: async () => {
      await courseApi.createOrUpdateAnnouncement({
        courseId: course!.id,
        text: announcementText,
        announcementId: announcement.id,
      });
    },
    onSuccess: async () => {
      if (isMounted.current) {
        setShowUpdateAnnouncement(false);
      }
      await refetch();
    },
    onError: () => {
      if (isMounted.current) {
        setShowUpdateAnnouncement(false);
      }
      showAlert(
        "warning",
        "Failed to update the announcement. Please try again."
      );
    },
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: async () => {
      await courseApi.deleteAnnouncement(announcement.id, course!.id);
    },
    onSuccess: async () => {
      if (isMounted.current) {
        setShowDeleteAnnouncement(false);
      }
      await refetch();
    },
    onError: () => {
      if (isMounted.current) {
        setShowDeleteAnnouncement(false);
      }
      showAlert(
        "warning",
        "Failed to delete the announcement. Please try again."
      );
    },
  });

  const deleteAnnouncementCommentMutation = useMutation({
    mutationFn: async () =>
      courseApi.deleteAnnouncementComment(
        course!.id,
        announcement.id,
        commentToBeDeleted!.id
      ),

    onSuccess: async () => {
      if (isMounted.current) {
        setShowDeleteComponent(false);
        setCommentToBeDeleted(null);
      }
      await refetch();
    },
    onError: () => {
      if (isMounted.current) {
        setShowDeleteComponent(false);
        setCommentToBeDeleted(null);
      }
      showAlert("warning", "Failed to delete the comment. Please try again.");
    },
  });

  return (
    <div className="border-b pb-8 pt-8 border-gray-300" key={announcement.id}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ProfileImage
            src={`${profilePicsEndPoint}/${course!.teacher.id}?${
              course!.teacher.sasTokenForReadingProfilePic
            }`}
            firstName={course!.teacher.firstName}
            lastName={course!.teacher.lastName}
            className="mr-2"
          />
          <div className="text-sm">
            <span className="text-[var(--addi-color-400)] font-semibold underline">
              {course!.teacher.firstName} {course!.teacher.lastName}
            </span>
            <span className="text-gray-500">
              {" "}
              has posted an announcement •{" "}
              {getRelativeTimeFromNow(announcement.dateOfCreation)}
            </span>
          </div>
        </div>

        {/* Edit and Delete Icons - Only for Teachers */}
        {course?.ownsCourse && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setAnnouncementText(announcement.text);
                setShowUpdateAnnouncement(true);
              }}
              className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteAnnouncement(true)}
              className="p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Simplified Announcement Text Content */}
      <p className="mt-4 text-gray-700 leading-relaxed">{announcement.text}</p>

      <div className="mt-4">
        {/* This is where the comment input and comments would go */}
        <CommentInput
          onPost={async () => {
            await refetch();
          }}
          announcementId={announcement.id}
          courseId={course!.id}
        />
      </div>

      {/* Show Comments Link/Button (appears once) */}
      {announcement.announcementComments.length > 0 && (
        <button
          onClick={() => setShowComments(!showComments)}
          className="block w-fit text-lg font-bold text-black border-b-2 border-[var(--addi-color-400)] pb-1 cursor-pointer hover:border-[var(--addi-color-500)] transition-colors duration-200 mt-4"
        >
          {showComments ? "Hide" : "Show"} comments (
          {announcement.announcementComments.length})
        </button>
      )}

      <div
        className={`transition-all duration-700 ease-in-out transform ${
          showComments
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {showComments && (
          <AnnouncementComments
            announcement={announcement}
            setShowDeleteComponent={setShowDeleteComponent}
            setCommentToBeDeleted={setCommentToBeDeleted}
            setShowUpdateComponent={setShowUpdateComponent}
            setCommentToBeUpdated={setCommentToBeUpdated}
          />
        )}
      </div>

      {/* Update Announcement Modal */}
      {showUpdateAnnouncement && (
        <UpdateComponent
          onClose={() => {
            if (isMounted.current) {
              setShowUpdateAnnouncement(false);
            }
          }}
          title="Update Announcement"
          text={announcementText}
          placeHolder="Update your announcement here..."
          mutation={updateAnnouncementMutation}
          onChange={(text: string) => setAnnouncementText(text)}
        />
      )}

      {/* Delete Announcement Confirmation */}
      {showDeleteAnnouncement && (
        <DeleteComponent
          onClose={() => {
            if (isMounted.current) {
              setShowDeleteAnnouncement(false);
            }
          }}
          text="Are you sure you want to delete this announcement? This action cannot be undone."
          title="Delete Announcement"
          mutation={deleteAnnouncementMutation}
        />
      )}

      {showDeleteComponent && (
        <DeleteComponent
          onClose={() => {
            if (isMounted.current) {
              setShowDeleteComponent(false);
              setCommentToBeDeleted(null);
            }
          }}
          text="Are you sure you want to delete this comment?"
          title="Delete Comment"
          mutation={deleteAnnouncementCommentMutation}
        />
      )}
      {showUpdateComponent && (
        <UpdateAnnouncementComment
          comment={commentToBeUpdated!}
          announcementId={announcement.id}
          courseId={course!.id}
          onClose={() => {
            if (isMounted.current) {
              setShowUpdateComponent(false);
              setCommentToBeUpdated(null);
            }
          }}
          onUpdate={async () => {
            if (isMounted.current) {
              setShowUpdateComponent(false);
              setCommentToBeUpdated(null);
            }
            await refetch();
          }}
        />
      )}
    </div>
  );
}

export default AnnouncementC;
