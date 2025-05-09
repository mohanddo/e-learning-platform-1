"use client";
import { useParams } from "next/navigation";
import CourseDetails from "@/components/courseDetails/courseDetails";

const CourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  return <CourseDetails id={Number(id)} role={"unauthenticated"} />;
};
export default CourseDetailsPage;
