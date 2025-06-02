"use client";
import { Course } from "../types/types";
import { useAppContext } from "../../context/context";
import { useEffect, useState } from "react";
import CourseCard from "./courseCard";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import HomePageCoursesError from "./HomePageCoursesError";
import FilterDiv from "./filterDiv";
import CourseCardLoading from "./CourseCardLoading";
const HomePageCourses = ({ role }: { role: string }) => {
  const { categorie } = useAppContext();
  const [currentSet, setCurrentSet] = useState<Course[]>([]);
  const [count, setCount] = useState<number>(0);
  const { courses, setCourses } = useAppContext();

  const { status, refetch } = useQuery({
    queryKey: ["getAllCourses"],
    queryFn: async () => {
      let data: Course[] = [];
      if (role === "unauthenticated") {
        data = await courseApi.getAllCourses();
      } else if (role === "student") {
        data = await courseApi.getStudentCourses();
      } else if (role === "teacher") {
        data = await courseApi.getTeacherCourses();
      }
      setCourses(data);
      return data;
    },
  });

  if (status === "pending") {
    return <CourseCardLoading />;
  }

  if (status === "error") {
    return <HomePageCoursesError refetch={refetch} />;
  }

  // useEffect(() => {
  //   if (categorie === "All") {
  //     const cur = courses.slice(count, count + 6);
  //     setCurrentSet(cur);
  //   } else {
  //     const cur: Course[] = courses.filter((pr) => pr.category === categorie);

  //     setCurrentSet(cur);
  //   }
  // }, [courses, categorie]);

  // useEffect(() => {
  //   console.log(currentSet);
  // }, [currentSet]);

  return (
    <section className="mb-5">
      <FilterDiv />
      <div className="flex flex-row flex-wrap gap-3 items-center justify-center mb-5">
        {courses?.map((crs) => (
          <CourseCard key={crs.id} course={crs} role={role} />
        ))}
      </div>

      <div className="w-full flex justify-around">
        <Button
          variant={"outline"}
          onClick={() => setCount(count + 6)}
          className="border border-solid border-[var(--addi-color-500)] bg-[var(--color-100)] text-[var(--addi-color-500)] hover:bg-[var(--color-200)]"
        >
          prev
        </Button>
        <p>1</p>
        <Button
          variant={"outline"}
          onClick={() => setCount(count - 6)}
          className="border border-solid border-[var(--addi-color-500)] bg-[var(--color-100)] text-[var(--addi-color-500)] hover:bg-[var(--color-200)]"
        >
          next
        </Button>
      </div>
    </section>
  );
};

export default HomePageCourses;
