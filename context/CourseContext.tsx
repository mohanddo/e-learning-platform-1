import { Chapter, Course, Resource } from "@/types/types";
import { createContext, useContext, ReactNode, useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";

interface CourseContextType {
  course: Course | null;
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  refetch: () => Promise<QueryObserverResult<Course, Error>>;
  activeResource: Resource | null;
  setActiveResource: React.Dispatch<React.SetStateAction<Resource | null>>;
  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newChapterTitle: string;
  setNewChapterTitle: React.Dispatch<React.SetStateAction<string>>;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chapterToUpdate: Chapter | null;
  setChapterToUpdate: React.Dispatch<React.SetStateAction<Chapter | null>>;
  updatedTitle: string;
  setUpdatedTitle: React.Dispatch<React.SetStateAction<string>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chapterToDelete: Chapter | null;
  setChapterToDelete: React.Dispatch<React.SetStateAction<Chapter | null>>;
  resourceToDelete: Resource | null;
  setResourceToDelete: React.Dispatch<React.SetStateAction<Resource | null>>;
  resourceToUpdate: Resource | null;
  setResourceToUpdate: React.Dispatch<React.SetStateAction<Resource | null>>;
  isAddResourceModalOpen: boolean;
  setIsAddResourceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateResourceModalOpen: boolean;
  setIsUpdateResourceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [chapterToUpdate, setChapterToUpdate] = useState<Chapter | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState<Chapter | null>(null);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(
    null
  );
  const [resourceToUpdate, setResourceToUpdate] = useState<Resource | null>(
    null
  );
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [isUpdateResourceModalOpen, setIsUpdateResourceModalOpen] =
    useState(false);

  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
        refetch,
        activeResource,
        setActiveResource,
        isAddModalOpen,
        setIsAddModalOpen,
        newChapterTitle,
        setNewChapterTitle,
        isUpdateModalOpen,
        setIsUpdateModalOpen,
        chapterToUpdate,
        setChapterToUpdate,
        updatedTitle,
        setUpdatedTitle,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        chapterToDelete,
        setChapterToDelete,
        resourceToDelete,
        setResourceToDelete,
        resourceToUpdate,
        setResourceToUpdate,
        isAddResourceModalOpen,
        setIsAddResourceModalOpen,
        isUpdateResourceModalOpen,
        setIsUpdateResourceModalOpen,
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
