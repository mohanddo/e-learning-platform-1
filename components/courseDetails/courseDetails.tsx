"use client";

import AboutCourse from "@/components/courseDetails/aboutCourse";
import JoinCourse from "@/components/courseDetails/joinCourse";
import CourseHeader from "./courseHeader";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import CourseDetailsSkeleton from "./courseDetailsSkeleton";
import CourseDetailsError from "./courseDetailsError";
import VideoPlayer from "../ui/VideoPlayer";
import { Video } from "../types";
import { useEffect, useState } from "react";
const CourseDetails = ({ id, role }: { id: number; role: string }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const {
    data: course,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      let course;
      if (role === "student") {
        course = await courseApi.getStudentCourseById(id);
      } else if (role === "teacher") {
        course = await courseApi.getTeacherCourseById(id);
      } else {
        course = await courseApi.getCourseById(id);
      }
      return course;
    },
  });

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isVideoPlaying) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVideoPlaying]);

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError) {
    return <CourseDetailsError refetch={refetch} />;
  }

  const freeVideos: Video[] = [
    ...(course!.introductionVideoUrl
      ? [
          {
            id: -1,
            title: course!.title,
            downloadUrl: course!.introductionVideoUrl,
            free: true,
            duration: 0,
            dateOfCreation: "",
            isFinished: false,
          },
        ]
      : []),
    ...course!.chapters.flatMap((chapter) =>
      chapter.videos.filter((video) => video.free)
    ),
  ];

  return (
    <section className="flex flex-col pt-[15vh]">
      {isVideoPlaying && (
        <VideoPlayer
          open={isVideoPlaying}
          onClose={() => setIsVideoPlaying(false)}
          freeVideos={freeVideos}
          onSelectVideo={(video) => {
            setIsVideoPlaying(true);
          }}
        />
      )}
      <CourseHeader course={course!} />
      <section className="flex justify-center">
        <div className="w-[85%] flex flex-row">
          <AboutCourse id={id} course={course!} />
          <JoinCourse
            role={role}
            id={id}
            course={course!}
            setIsVideoPlaying={setIsVideoPlaying}
          />
        </div>
      </section>
    </section>
  );
};
export default CourseDetails;
