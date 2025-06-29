"use client";

import { Course } from "../../types/types";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppContext } from "@/context/context";
import { useAddToCartMutation } from "@/hooks/useAddToCartMutation";
import ProfileImage from "../ui/profile-image";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

const CourseCard = ({ course, role }: { course: Course; role: string }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const goToCourseDetails = () => {
    router.push(`/courseDetails/${course.id}`);
  };

  const { setCourses, courses } = useAppContext();

  const addCourseToCartMutation = useAddToCartMutation({
    courseId: course.id,
    onSuccess: () => {
      setCourses(
        courses!.map((c) => (c.id === course.id ? { ...c, inCart: true } : c))
      );
    },
  });

  const handleCartButton = () => {
    if (course.inCart) {
      router.push("/student/cart");
    } else {
      addCourseToCartMutation.mutate();
    }
  };

  return (
    <div
      className="relative flex flex-col p-5 rounded-2xl overflow-hidden shadow-lg bg-white w-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isMobile && setIsHovered(!isHovered)}
    >
      <Image
        src={course.imageUrl || ""}
        alt="sorry image non disponble"
        className="w-full h-72 object-cover mb-2 rounded-2xl"
        priority={true}
        width={288}
        height={128}
      />
      <div className="flex flex-col items-center space-x-3 w-full mb-2">
        <div className="flex flex-row justify-between w-full mb-2">
          <div className="flex flex-row items-center">
            <ProfileImage
              src={`${profilePicsEndPoint}/${course.teacher.id}?${course.teacher.sasTokenForReadingProfilePic}`}
              firstName={course.teacher.firstName}
              lastName={course.teacher.lastName}
              className="mr-2"
            />
            <span className="font-semibold">{course.teacher.lastName}</span>
          </div>
          <span className="bg-[var(--color-50)] flex items-center rounded-2xl px-2 text-[var(--addi-color-500)] border-[var(--addi-color-500)] border-solid border">
            {course.category}
          </span>
        </div>
        <p className="text-lg font-bold mb-2 line-clamp-1">{course.title}</p>
        <div className="w-full flex flex-row justify-between font-semibold mb-3">
          <span>{course.chapters.length} chapters</span>
          <span>{course.numberOfStudents} students</span>
        </div>

        {isHovered ? (
          <div className="w-full flex flex-row justify-between py-1">
            {role == "student" && !course.enrolled && (
              <Button
                className="btn-principal cursor-pointer"
                onClick={handleCartButton}
                disabled={addCourseToCartMutation.isPending}
              >
                {addCourseToCartMutation.isPending
                  ? "Adding..."
                  : course.inCart
                  ? "Access cart"
                  : "Add To Cart"}
              </Button>
            )}
            {role == "student" && course.enrolled && (
              <Button
                className="btn-principal cursor-pointer"
                onClick={() => router.push(`student/course/${course.id}`)}
              >
                Access Course
              </Button>
            )}

            {role == "teacher" && course.ownsCourse && (
              <Button
                className="btn-principal cursor-pointer"
                onClick={() => router.push(`teacher/course/${course.id}`)}
              >
                Edit Course
              </Button>
            )}

            <Button
              variant={"outline"}
              className={`
                flex-1
                ${role === "unauthenticated" ? "w-full" : ""}
                    text-[var(--addi-color-500)] font-semibold border-[var(--addi-color-500)] py-3 hover:bg-[var(--color-100)] cursor-pointer ml-2`}
              onClick={goToCourseDetails}
            >
              See Course details
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-row justify-between bg-green-100 py-2 px-3 rounded-2xl">
            {course.discountPercentage ? (
              <span className="flex flex-row">
                <p className="text-green-600 text-lg font-bold">
                  {course.price -
                    course.price * (course.discountPercentage / 100)}{" "}
                  DA
                </p>
                <p className="text-gray-400 text-sm font-semibold line-through ml-2">
                  {course.price} DA
                </p>
              </span>
            ) : (
              <span className="text-green-600 text-lg font-bold">
                {course.price} DA
              </span>
            )}

            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i <= Math.round(course.rating) ? "yellow" : "none"}
                  className={
                    i <= Math.round(course.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">
                ({course.rating})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
