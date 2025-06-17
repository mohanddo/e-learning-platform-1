import { useCourse } from "@/context/CourseContext";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { UpdateVideoProgressRequest } from "@/types/request";
import { findChapterId } from "@/utils";
import { Video } from "@/types/types";

const PurchasedCourseVideo: React.FC = () => {
  const { activeResource } = useCourse();

  const playerRef = useRef<ReactPlayer>(null);
  const { course } = useCourse();

  const updateVideoProgressMutation = useMutation({
    mutationFn: async (request: UpdateVideoProgressRequest) => {
      await courseApi.updateVideoProgress(request);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const current = playerRef.current?.getCurrentTime?.();
      if (current) {
        updateVideoProgressMutation.mutate({
          courseId: course!.id,
          videoId: activeResource!.id,
          chapterId: findChapterId(activeResource, course?.chapters)!,
          progress: current,
        });
      }
    }, 5000); // every 5s

    return () => clearInterval(interval);
  }, [activeResource, course]);

  useEffect(() => {
    if (activeResource) {
      playerRef.current?.seekTo(
        (activeResource as Video).videoProgress,
        "seconds"
      );
    }
  }, [activeResource, course]);

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
      ref={playerRef}
      style={{ maxHeight: 500 }}
    />
  );
};

export default PurchasedCourseVideo;
