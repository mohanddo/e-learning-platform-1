"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import type { Course, Student, Teacher, User } from "@/types/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import Cookie from "js-cookie";

interface AppContextType {
  categorie: string;
  setCategorie: React.Dispatch<React.SetStateAction<string>>;
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;

  student: Student | null;
  setStudent: (student: Student) => void;

  teacher: Teacher | null;
  setTeacher: (teacher: Teacher) => void;

  user: User | null;
  setUser: (user: User) => void;

  isLogged: boolean | undefined;
  logout: () => void;

  emailToVerify: string | null;
  setEmailToVerify: (emailToVerify: string) => void;

  courses: Course[] | null;
  setCourses: (courses: Course[]) => void;

  showHeader: boolean;
  setShowHeader: (showHeader: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [categorie, setCategorie] = useState<string>("All");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [emailToVerify, setEmailToVerify] = useState<string | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [showHeader, setShowHeader] = useState<boolean>(true);

  const logout = () => {
    setStudent(null);
    setTeacher(null);
    setIsLogged(false);
  };

  useEffect(() => {
    const token = Cookie.get("isLogged");
    if (!token) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, [student, teacher]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          categorie,
          setCategorie,
          isSignUp,
          setIsSignUp,
          student,
          setStudent,
          logout,
          emailToVerify,
          setEmailToVerify,
          isLogged,
          teacher,
          setTeacher,
          courses,
          setCourses,
          showHeader,
          setShowHeader,
          user,
          setUser,
        }}
      >
        {children}
      </AppContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

// context hook

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within the app provider !");
  }

  return context;
};
