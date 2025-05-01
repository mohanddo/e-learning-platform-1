"use client";

import { courses } from "@/app/data";
import { useParams } from "next/navigation";
import CourseHeader from "@/components/courseDetails/courseHeader";
import AboutCourse from "@/components/courseDetails/aboutCourse";
import JoinCourse from "@/components/courseDetails/joinCourse";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((crs) => crs.id === Number(id));

  return (
    <section className="flex flex-col">
      <section className="flex justify-center pt-[10vh]">
        <div className="w-[85%] flex flex-row">
          <AboutCourse />
          <JoinCourse />
        </div>
      </section>
    </section>
  );
};
export default CourseDetails;
