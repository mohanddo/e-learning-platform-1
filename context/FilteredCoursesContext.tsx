"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "@/types/types";

interface FilteredCoursesContextType {
  filteredCourses: Course[];
  setFilteredCourses: (courses: Course[]) => void;
  filterCourses: (
    courses: Course[] | null,
    category: string,
    courseName: string
  ) => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  currentCourseName: string;
  setCurrentCourseName: (courseName: string) => void;
}

const FilteredCoursesContext = createContext<
  FilteredCoursesContextType | undefined
>(undefined);

export const useFilteredCourses = () => {
  const context = useContext(FilteredCoursesContext);
  if (!context) {
    throw new Error(
      "useFilteredCourses must be used within a FilteredCoursesProvider"
    );
  }
  return context;
};

interface FilteredCoursesProviderProps {
  children: ReactNode;
}

export const FilteredCoursesProvider: React.FC<
  FilteredCoursesProviderProps
> = ({ children }) => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const [currentCourseName, setCurrentCourseName] = useState<string>("");

  const filterCourses = (
    courses: Course[] | null,
    category: string,
    courseName: string
  ) => {
    if (courses === null) {
      return;
    }

    const filtered = courses.filter(
      (course) =>
        (category === "All"
          ? true
          : course.category === category.toUpperCase()) && // Fixed: toUpperCase()
        (courseName.trim()
          ? course.title.toLowerCase().includes(courseName.toLowerCase()) // Fixed: proper case handling
          : true)
    );
    setFilteredCourses(filtered);
  };

  return (
    <FilteredCoursesContext.Provider
      value={{
        filteredCourses,
        setFilteredCourses,
        filterCourses,
        currentCategory,
        setCurrentCategory,
        currentCourseName,
        setCurrentCourseName,
      }}
    >
      {children}
    </FilteredCoursesContext.Provider>
  );
};
