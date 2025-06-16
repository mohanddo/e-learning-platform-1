import { useCourse } from "@/context/CourseContext";
import React from "react";
import ReactPlayer from "react-player";

const PurchasedCourseVideo: React.FC = () => {
  const { activeResource } = useCourse();

  if (!activeResource) {
    return (
      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
        No video available
      </div>
    );
  }

  return (
    <ReactPlayer
      url={activeResource.downloadUrl}
      controls
      width="100%"
      height="100%"
      style={{ maxHeight: 500 }}
    />
  );
};

export default PurchasedCourseVideo;
