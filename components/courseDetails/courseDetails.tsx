"use client";

import AboutCourse from "@/components/courseDetails/aboutCourse";
import JoinCourse from "@/components/courseDetails/joinCourse";
import CourseHeader from "./courseHeader";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import CourseDetailsSkeleton from "./courseDetailsSkeleton";
import CourseDetailsError from "./courseDetailsError";

const CourseDetails = ({ id, role }: { id: number; role: string }) => {
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
      <CourseHeader course={course!} />
      <section className="flex justify-center">
        <div className="w-[85%] flex flex-row">
          <AboutCourse id={id} course={course!} />
          <JoinCourse role={role} id={id} course={course!} />
        </div>
      </section>
    </section>
  );
};
export default CourseDetails;
