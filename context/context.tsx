"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import type { Course, Student, Teacher, User } from "@/types/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

interface AppContextType {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;

  student: Student | null;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;

  teacher: Teacher | null;
  setTeacher: React.Dispatch<React.SetStateAction<Teacher | null>>;

  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  isLogged: boolean | undefined;
  logout: () => void;

  emailToVerify: string | null;
  setEmailToVerify: React.Dispatch<React.SetStateAction<string | null>>;

  courses: Course[] | null;
  setCourses: React.Dispatch<React.SetStateAction<Course[] | null>>;
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
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [emailToVerify, setEmailToVerify] = useState<string | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const router = useRouter();
  const path = usePathname();

  const logout = () => {
    setStudent(null);
    setTeacher(null);
    setIsLogged(false);
    const shouldRedirect =
      path.startsWith("/teacher") || path.startsWith("/student");

    const isAlreadyOnAuthPage = path.startsWith("/auth");
    if (shouldRedirect && !isAlreadyOnAuthPage) {
      router.push("/auth");
    }
  };

  useEffect(() => {
    window.addEventListener("isLoggedOut", logout);
    return () => window.removeEventListener("isLoggedOut", logout);
  }, []);

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
