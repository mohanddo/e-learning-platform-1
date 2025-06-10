"use client";

import AboutCourse from "@/components/courseDetails/aboutCourse";
import JoinCourse from "@/components/courseDetails/joinCourse";
import CourseHeader from "./courseHeader";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import CourseDetailsSkeleton from "./courseDetailsSkeleton";
import CourseDetailsError from "./courseDetailsError";
import VideoPlayer from "../ui/VideoPlayer";
import { Video } from "../../types/types";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/context/context";
import { authApi } from "@/api/auth/studentAuth.api";
import ReviewModal from "../ui/ReviewModal";
const CourseDetails = ({ id, role }: { id: number; role: string }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const {
    data: course,
    isLoading,
    isError,
    refetch: refetchCourse,
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

  const { setStudent, student } = useAppContext();

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

  // Find the current user's review if it exists
  const currentUserReview = useMemo(() => {
    return course?.courseReviews.find((r) => r.student.id === student?.id);
  }, [course, student]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  if (isLoading || (isLoadingGettingStudent && role == "student")) {
    return <CourseDetailsSkeleton />;
  }

  if (isError || (isErrorGettingStudent && role == "student")) {
    return (
      <CourseDetailsError
        refetch={() => {
          refetchCourse();
          refetchStudent();
        }}
      />
    );
  }

  // This part should be put in a useEffect ?
  let freeVideos: Video[] = [];
  if (course) {
    freeVideos = [
      ...(course.introductionVideoUrl
        ? [
            {
              id: -1,
              title: course.title,
              downloadUrl: course.introductionVideoUrl!,
              free: true,
              duration: 0,
              dateOfCreation: "",
              isFinished: false,
            } as Video,
          ]
        : []),
      ...course.chapters.flatMap(
        (chapter: import("../../types/types").Chapter) =>
          chapter.videos.filter((video: Video) => video.free)
      ),
    ];
  } else {
    return null;
  }

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
      {reviewModalOpen && (
        <ReviewModal
          courseId={course.id}
          onClose={() => setReviewModalOpen(false)}
          review={currentUserReview}
          onAdd={async () => {
            setReviewModalOpen(false);
            refetchCourse();
          }}
          onUpdate={() => {
            setReviewModalOpen(false);
            refetchCourse();
          }}
          onDelete={() => {
            setReviewModalOpen(false);
            refetchCourse();
          }}
        />
      )}
      <CourseHeader course={course} />
      <section className="flex justify-center">
        <div className="w-[85%] flex flex-row">
          <AboutCourse course={course} />
          <JoinCourse
            role={role}
            course={course}
            setIsVideoPlaying={setIsVideoPlaying}
            setReviewModalOpen={setReviewModalOpen}
            currentUserReview={currentUserReview}
          />
        </div>
      </section>
    </section>
  );
};
export default CourseDetails;
