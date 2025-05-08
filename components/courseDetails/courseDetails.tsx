"use client";

import AboutCourse from "@/components/courseDetails/aboutCourse";
import JoinCourse from "@/components/courseDetails/joinCourse";
import CourseHeader from "./courseHeader";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import CourseDetailsSkeleton from "./courseDetailsSkeleton";
import CourseDetailsError from "./courseDetailsError";
import VideoPlayer from "../ui/VideoPlayer";
import { useState } from "react";
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

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError) {
    return <CourseDetailsError refetch={refetch} />;
  }

  return (
    <section className="flex flex-col pt-[15vh]">
      {isVideoPlaying && (
        <VideoPlayer
          open={isVideoPlaying}
          onClose={() => setIsVideoPlaying(false)}
          videoUrl={course!.introductionVideoUrl!}
          title={course!.title}
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
