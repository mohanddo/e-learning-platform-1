import { useCourse } from "@/context/CourseContext";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { UpdateVideoProgressRequest } from "@/types/request";
import { findChapterId } from "@/utils";
import { Course, Resource, Video } from "@/types/types";
import { useAddFinishedResourceMutation } from "@/hooks/useAddFinishedResourceMutation";

const PurchasedCourseVideo: React.FC = () => {
  const { activeResource, setCourse, setActiveResource } = useCourse();

  const addFinishedResourceMutation = useAddFinishedResourceMutation();

  const playerRef = useRef<ReactPlayer>(null);
  const { course } = useCourse();

  const updateVideoProgressMutation = useMutation({
    mutationFn: async (request: UpdateVideoProgressRequest) => {
      await courseApi.updateVideoProgress(request);
    },
  });
  const prevActiveResource = useRef<Resource>(activeResource);
  const currentProgressRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = playerRef.current?.getCurrentTime?.();
      if (current && activeResource) {
        updateVideoProgressMutation.mutate({
          courseId: course!.id,
          videoId: activeResource!.id,
          chapterId: findChapterId(activeResource, course?.chapters)!,
          progress: current,
        });
        currentProgressRef.current = current;
      }
    }, 10000); // every 10s

    return () => clearInterval(interval);
  }, [activeResource]);

  useEffect(() => {
    const prevResource = prevActiveResource.current;
    const prevProgress = currentProgressRef.current;
    if (prevResource && prevProgress) {
      setCourse((prevCourse: Course | null): Course | null => {
        if (!prevCourse) return prevCourse;
        return {
          ...prevCourse,
          chapters: prevCourse.chapters.map((chapter) => ({
            ...chapter,
            videos: chapter.videos.map((video) =>
              video.id === prevResource.id
                ? { ...video, videoProgress: prevProgress }
                : video
            ),
          })),
        };
      });
    }
    prevActiveResource.current = activeResource;
  }, [activeResource]);

  const hasSeekedRef = useRef(false);
  useEffect(() => {
    hasSeekedRef.current = false; // Reset when resource changes
  }, [activeResource]);

  if (!activeResource) {
    return (
      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
        No video available
      </div>
    );
  }

  return (
    <ReactPlayer
      key={activeResource.id}
      url={activeResource.downloadUrl}
      controls
      width="100%"
      height="100%"
      ref={playerRef}
      style={{ maxHeight: 500 }}
      onReady={() => {
        if (activeResource && !hasSeekedRef.current) {
          playerRef.current?.seekTo(
            (activeResource as Video).videoProgress,
            "seconds"
          );
          hasSeekedRef.current = true;
        }
      }}
      onEnded={() => {
        if (!activeResource.isFinished) {
          addFinishedResourceMutation.mutate({
            courseId: course!.id,
            chapterId: findChapterId(activeResource, course?.chapters)!,
            resourceId: activeResource.id,
          });
          setActiveResource((prevActiveResource: Resource | null) => {
            if (!prevActiveResource) return prevActiveResource;

            return {
              ...activeResource,
              isFinished: true,
            };
          });
          setCourse((prevCourse: Course | null) => {
            if (!prevCourse) return prevCourse;

            return {
              ...prevCourse,
              chapters: prevCourse.chapters.map((chapter) => {
                if (
                  chapter.id !== findChapterId(activeResource, course?.chapters)
                )
                  return chapter;
                return {
                  ...chapter,
                  videos: chapter.videos.map((v) =>
                    v.id === activeResource.id
                      ? { ...v, isFinished: !v.isFinished }
                      : v
                  ),
                };
              }),
            };
          });
        }
      }}
    />
  );
};

export default PurchasedCourseVideo;
