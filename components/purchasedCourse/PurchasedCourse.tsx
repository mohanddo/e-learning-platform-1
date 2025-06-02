import CourseSidebar from "@/components/purchasedCourse/CourseSidebar";
import { courseApi } from "@/api/course.api";
import { useQuery } from "@tanstack/react-query";
import PurchasedCourseVideo from "@/components/purchasedCourse/PurchasedCourseVideo";
import PurchasedCourseTabs from "@/components/purchasedCourse/PurchasedCourseTabs";
import { useState } from "react";

export default function PurchasedCourse({ id }: { id: number }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    data: course,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      return await courseApi.getStudentCourseById(Number(id));
    },
  });

  if (isLoading) {
    return <h1>isLoading</h1>;
  }

  if (isError) {
    return <h1>isError</h1>;
  }

  return (
    <div className="flex flex-row min-h-screen mt-[15vh]">
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "max-w-[calc(100vw-30vw)]" : "max-w-full"
        }`}
      >
        <PurchasedCourseVideo course={course!} selectedVideo={null} />
        <PurchasedCourseTabs course={course!} />
      </div>
      {/* Sidebar right */}
      <CourseSidebar course={course!} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
