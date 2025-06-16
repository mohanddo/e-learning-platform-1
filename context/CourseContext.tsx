import { Course, Resource } from "@/types/types";
import { createContext, useContext, ReactNode, useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";

interface CourseContextType {
  course: Course | null;
  setCourse: (course: Course | null) => void;
  refetch: () => Promise<QueryObserverResult<Course, Error>>;
  activeResource: Resource | null;
  setActiveResource: (id: Resource | null) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({
  children,
  initialCourse,
  refetch,
}: {
  children: ReactNode;
  initialCourse: Course | null;
  refetch: () => Promise<QueryObserverResult<Course, Error>>;
}) {
  const [course, setCourse] = useState<Course | null>(initialCourse);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);

  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
        refetch,
        activeResource,
        setActiveResource,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}
