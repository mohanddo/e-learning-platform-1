"use client";
import { useParams } from "next/navigation";
import AboutCourse from "@/components/courseDetails/aboutCourse";
import JoinCourse from "@/components/courseDetails/joinCourse";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="flex flex-col">
      <section className="flex justify-center pt-[10vh]">
        <div className="w-[85%] flex flex-row">
          <AboutCourse />
          <JoinCourse role={"unauthenticated"} />
        </div>
      </section>
    </section>
  );
};
export default CourseDetails;
