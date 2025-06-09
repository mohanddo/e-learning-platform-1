import React from "react";
import AnnouncementC from "./Announcement";
import { useCourse } from "@/context/CourseContext";
function CourseAnnouncementsList() {
  const { course } = useCourse();

  return (
    <div className="max-w-3xl mx-auto">
      {course!.announcements.map((announcement) => (
        <AnnouncementC announcement={announcement} key={announcement.id} />
      ))}
    </div>
  );
}

export default CourseAnnouncementsList;
