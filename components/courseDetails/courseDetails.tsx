"use client";

import AboutCourse from "@/components/courseDetails/aboutCourse";
import JoinCourse from "@/components/courseDetails/joinCourse";
import CourseHeader from "./courseHeader";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import CourseDetailsSkeleton from "./courseDetailsSkeleton";
import CourseDetailsError from "./courseDetailsError";
import VideoPlayer from "../ui/VideoPlayer";
import { Video, Course } from "../types/types";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/context";
import { authApi } from "@/api/auth/studentAuth.api";
const CourseDetails = ({ id, role }: { id: number; role: string }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const {
    data: course,
    isLoading,
    isError,
    refetch: refetchCourses,
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

  const { setStudent } = useAppContext();

  const {
    isLoading: isLoadingGettingStudent,
    refetch: refetchStudent,
    isError: isErrorGettingStudent,
  } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const data = await authApi.me();
      setStudent(data);
      return data;
    },
  });

  const [courseState, setCourse] = useState<Course | null>(null);
  useEffect(() => {
    if (course) {
      setCourse(course);
    }
  }, [course]);

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

  if (isLoading || (isLoadingGettingStudent && role == "student")) {
    return <CourseDetailsSkeleton />;
  }

  if (isError || (isErrorGettingStudent && role == "student")) {
    return (
      <CourseDetailsError
        refetch={() => {
          refetchCourses();
          refetchStudent();
        }}
      />
    );
  }

  let freeVideos: Video[] = [];
  if (courseState) {
    freeVideos = [
      ...(courseState.introductionVideoUrl
        ? [
            {
              id: -1,
              title: courseState.title,
              downloadUrl: courseState.introductionVideoUrl!,
              free: true,
              duration: 0,
              dateOfCreation: "",
              isFinished: false,
            } as Video,
          ]
        : []),
      ...courseState.chapters.flatMap(
        (chapter: import("../types/types").Chapter) =>
          chapter.videos.filter((video: Video) => video.free)
      ),
    ];
  }

  if (!courseState) return null;

  return (
    <section className="flex flex-col pt-[15vh]">
      {isVideoPlaying && (
        <VideoPlayer
          open={isVideoPlaying}
          onClose={() => setIsVideoPlaying(false)}
          freeVideos={freeVideos}
          onSelectVideo={() => {
            setIsVideoPlaying(true);
          }}
        />
      )}
      <CourseHeader course={courseState} />
      <section className="flex justify-center">
        <div className="w-[85%] flex flex-row">
          <AboutCourse course={courseState} setCourse={setCourse} role={role} />
          <JoinCourse
            role={role}
            course={courseState}
            setCourse={setCourse}
            setIsVideoPlaying={setIsVideoPlaying}
          />
        </div>
      </section>
    </section>
  );
};
export default CourseDetails;
