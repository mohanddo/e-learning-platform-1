"use client";
import { Course } from "../../types/types";
import { useAppContext } from "../../context/context";
import { useFilteredCourses } from "../../context/FilteredCoursesContext";
import { useEffect, useState } from "react";
import CourseCard from "./courseCard";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import HomePageCoursesError from "./HomePageCoursesError";
import FilterDiv from "./filterDiv";
import CourseCardLoading from "./CourseCardLoading";

import { Search, BookOpen } from "lucide-react";

interface EmptyCoursesStateProps {
  onResetFilters?: () => void;
}

const EmptyCoursesState: React.FC<EmptyCoursesStateProps> = ({
  onResetFilters,
}) => {
  const { currentCategory, currentCourseName } = useFilteredCourses();

  const hasActiveFilters =
    currentCategory !== "All" || currentCourseName.trim() !== "";

  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Search className="w-16 h-16 text-gray-300" />
            <BookOpen className="w-8 h-8 text-gray-400 absolute -bottom-2 -right-2" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          {hasActiveFilters ? "No courses found" : "No courses available"}
        </h3>

        {/* Message */}
        <p className="text-gray-500 mb-6 leading-relaxed">
          {hasActiveFilters ? (
            <>
              We couldn't find any courses matching your current filters.
              {currentCategory !== "All" && (
                <span className="block mt-1">
                  Category:{" "}
                  <span className="font-medium">{currentCategory}</span>
                </span>
              )}
              {currentCourseName.trim() && (
                <span className="block mt-1">
                  Search:{" "}
                  <span className="font-medium">"{currentCourseName}"</span>
                </span>
              )}
            </>
          ) : (
            "There are currently no courses available. Please check back later or contact us for more information."
          )}
        </p>

        {/* Action Button */}
        {hasActiveFilters && onResetFilters && (
          <Button
            onClick={onResetFilters}
            className="bg-[var(--addi-color-500)] text-white font-semibold hover:bg-[var(--addi-color-400)] px-6 py-2"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

const HomePageCourses = ({ role }: { role: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { courses, setCourses } = useAppContext();
  const {
    filteredCourses,
    setFilteredCourses,
    setCurrentCategory,
    setCurrentCourseName,
  } = useFilteredCourses();

  const COURSES_PER_PAGE = 3;

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

  // Update filtered courses when courses change
  useEffect(() => {
    if (courses && courses.length > 0) {
      setFilteredCourses(courses);
    }
  }, [courses, setFilteredCourses]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCourses]);

  const handleResetFilters = () => {
    setCurrentCategory("All");
    setCurrentCourseName("");
    setCurrentPage(1);
    if (courses) {
      setFilteredCourses(courses);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(
    (filteredCourses?.length || 0) / COURSES_PER_PAGE
  );
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const endIndex = startIndex + COURSES_PER_PAGE;
  const currentCourses = filteredCourses?.slice(startIndex, endIndex) || [];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (status === "pending") {
    return <CourseCardLoading />;
  }

  if (status === "error") {
    return <HomePageCoursesError refetch={refetch} />;
  }

  return (
    <section className="mb-5" id="courses">
      <FilterDiv />

      {/* Show courses or empty state */}
      {filteredCourses && filteredCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center mb-5 max-w-6xl mx-auto">
            {currentCourses.map((crs) => (
              <CourseCard key={crs.id} course={crs} role={role} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="w-full flex justify-center items-center gap-4 mt-8">
              <Button
                variant={"outline"}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="border border-solid border-[var(--addi-color-500)] bg-[var(--color-100)] text-[var(--addi-color-500)] hover:bg-[var(--color-200)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="text-sm text-gray-500">
                  ({filteredCourses.length} courses)
                </span>
              </div>

              <Button
                variant={"outline"}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="border border-solid border-[var(--addi-color-500)] bg-[var(--color-100)] text-[var(--addi-color-500)] hover:bg-[var(--color-200)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyCoursesState onResetFilters={handleResetFilters} />
      )}
    </section>
  );
};

export default HomePageCourses;
