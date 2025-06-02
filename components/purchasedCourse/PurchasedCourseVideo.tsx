import React from "react";
import { Course, Video } from "@/components/types/types";
import ReactPlayer from "react-player";

interface PurchasedCourseVideoProps {
  course: Course;
  selectedVideo: Video | null;
}

const PurchasedCourseVideo: React.FC<PurchasedCourseVideoProps> = ({
  course,
  selectedVideo,
}) => {
  // Find the first video if none selected
  const firstVideo = course.chapters.flatMap((c) => c.videos)[0] || null;
  const video = selectedVideo || firstVideo;

  if (!video) {
    return (
      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
        No video available
      </div>
    );
  }

  return (
    // <div className="w-full aspect-video bg-black overflow-hidden">
    <ReactPlayer
      url={video.downloadUrl}
      controls
      width="100%"
      height="100%"
      style={{ maxHeight: 500 }}
    />
    // </div>
  );
};

export default PurchasedCourseVideo;
