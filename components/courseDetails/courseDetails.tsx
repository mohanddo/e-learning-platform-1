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
import { useEffect, useState } from "react";
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

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError) {
    return (
      <CourseDetailsError
        refetch={() => {
          refetchCourse();
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
          review={course.studentReview}
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
          onFail={() => {
            setReviewModalOpen(false);
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
          />
        </div>
      </section>
    </section>
  );
};
export default CourseDetails;
