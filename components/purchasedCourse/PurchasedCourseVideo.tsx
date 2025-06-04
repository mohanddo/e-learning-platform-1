import React from "react";
import { Video } from "@/types/types";
import ReactPlayer from "react-player";

interface PurchasedCourseVideoProps {
  selectedVideo: Video | null;
}

const PurchasedCourseVideo: React.FC<PurchasedCourseVideoProps> = ({
  selectedVideo,
}) => {
  if (!selectedVideo) {
    return (
      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
        No video available
      </div>
    );
  }

  return (
    <ReactPlayer
      url={selectedVideo.downloadUrl}
      controls
      width="100%"
      height="100%"
      style={{ maxHeight: 500 }}
    />
  );
};

export default PurchasedCourseVideo;
