"use client";

import { Button } from "../ui/button";
import {
  ShoppingCart,
  Video,
  Clock,
  File,
  Phone,
  Mail,
  Play,
} from "lucide-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { Course, CourseReview } from "../../types/types";
import { useRemoveFromCartMutation } from "@/hooks/useRemoveFromCartMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentApi } from "@/api/payment.api";
import { useEffect, useRef } from "react";
import { useAddToCartMutation } from "@/hooks/useAddToCartMutation";
import { useAddToFavoritesMutation } from "@/hooks/useAddToFavoritesMutation";
import { useRemoveFromFavoritesMutation } from "@/hooks/useRemoveFromFavoritesMutation";
const JoinCourse = ({
  role,
  course,
  setIsVideoPlaying,
  setReviewModalOpen,
  currentUserReview,
}: {
  role: string;
  course: Course;
  setIsVideoPlaying: (isVideoPlaying: boolean) => void;
  setReviewModalOpen: (isReviewModalOpen: boolean) => void;
  currentUserReview: CourseReview | undefined;
}) => {
  const { isLogged } = useAppContext();
  const router = useRouter();
  const isMounted = useRef(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const purchaseCourseMutation = useMutation({
    mutationFn: paymentApi.purchaseCourse,
    onSuccess(data) {
      router.replace(data);
    },
    onError: () => {
      if (isMounted.current) {
        alert("Error purchasing course");
      }
    },
  });

  const handleJoinCourse = () => {
    if (isLogged) {
      purchaseCourseMutation.mutate(course.id);
    } else {
      router.push("/auth");
    }
  };

  const removeCourseFromCartMutation = useRemoveFromCartMutation({
    courseId: course.id,
    onSuccess: () => {
      queryClient.setQueryData(
        ["course", course.id],
        (oldData: Course | undefined) => {
          if (!oldData) return oldData;
          return { ...oldData, inCart: false };
        }
      );
    },
  });

  const addCourseToCartMutation = useAddToCartMutation({
    courseId: course.id,
    onSuccess: () => {
      queryClient.setQueryData(
        ["course", course.id],
        (oldData: Course | undefined) => {
          if (!oldData) return oldData;
          return { ...oldData, inCart: true };
        }
      );
    },
  });

  const handleRemoveFromCart = () => {
    removeCourseFromCartMutation.mutate();
  };

  const handleAddToCart = () => {
    addCourseToCartMutation.mutate();
  };

  const addToFavoritesMutation = useAddToFavoritesMutation({
    courseId: course.id,
    onSuccess: () => {
      queryClient.setQueryData(
        ["course", course.id],
        (oldData: Course | undefined) => {
          if (!oldData) return oldData;
          return { ...oldData, favourite: true };
        }
      );
    },
  });

  const removeFromFavoritesMutation = useRemoveFromFavoritesMutation({
    courseId: course.id,
    onSuccess: () => {
      queryClient.setQueryData(
        ["course", course.id],
        (oldData: Course | undefined) => {
          if (!oldData) return oldData;
          return { ...oldData, favourite: false };
        }
      );
    },
  });

  const handleAddToFavorites = () => {
    addToFavoritesMutation.mutate();
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavoritesMutation.mutate();
  };

  return (
    <div className="flex-2 flex-col flex pb-28 pl-28 items-center sticky top-20 self-start w-full max-w-xl mx-auto">
      <div className="flex flex-col justify-center shadow-lg  mb-5">
        <div className="mb-5 relative flex items-center justify-center h-72 w-full">
          <Image
            src={course!.imageUrl || "/exmp1.jpg"}
            alt="image non disponible"
            fill
            className="rounded-t-xl brightness-50 object-cover"
          />
          {(course!.introductionVideoUrl ||
            course!.chapters.flatMap((chapter) =>
              chapter.videos.filter((video) => video.free)
            ).length > 0) && (
            <Button
              className="absolute flex items-center justify-center w-13 h-13 rounded-full bg-white text-lg transition-all duration-200 shadow-md hover:shadow-xl hover:scale-110 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="text-[var(--addi-color-500)] " />
            </Button>
          )}
        </div>

        <div className="pb-5 pr-5 pl-5">
          <div className="w-full flex items-center gap-2 py-2">
            <p className="text-lg font-bold text-gray-900">Price:</p>
            {course!.discountPercentage ? (
              <span className="flex items-baseline gap-2">
                <span className="text-gray-900 text-lg font-bold">
                  {course!.price -
                    course!.price * (course!.discountPercentage / 100)}
                  DA
                </span>
                <span className="text-gray-400 text-sm font-semibold line-through">
                  {course!.price} DA
                </span>
              </span>
            ) : (
              <span className="text-lg font-bold text-gray-900">{6000} DA</span>
            )}
          </div>

          {course?.discountExpirationDate && (
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg mb-4">
              <Clock size={16} className="text-yellow-500" />
              <span className="text-sm font-medium text-yellow-800">
                Expires on{" "}
                {new Date(course.discountExpirationDate).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
          )}

          <div className=" flex flex-col mb-5">
            {role === "student" && !course.enrolled && (
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {course!.inCart ? (
                    <Button
                      onClick={handleRemoveFromCart}
                      disabled={removeCourseFromCartMutation.isPending}
                      variant={"outline"}
                      className="text-[var(--addi-color-500)] font-bold border-[var(--addi-color-500)] py-3 hover:bg-[var(--color-100)] flex-1"
                    >
                      {removeCourseFromCartMutation.isPending
                        ? "Removing..."
                        : "Remove From Card"}
                      <ShoppingCart />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAddToCart}
                      disabled={addCourseToCartMutation.isPending}
                      variant={"outline"}
                      className="text-[var(--addi-color-500)] font-bold border-[var(--addi-color-500)] py-3 hover:bg-[var(--color-100)] flex-1"
                    >
                      {addCourseToCartMutation.isPending
                        ? "Adding..."
                        : "Add To Card"}
                      <ShoppingCart />
                    </Button>
                  )}

                  {course.favourite ? (
                    <Button
                      disabled={removeFromFavoritesMutation.isPending}
                      onClick={handleRemoveFromFavorites}
                      variant="outline"
                      className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                    >
                      <FavoriteIcon className="text-[var(--addi-color-500)]" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAddToFavorites}
                      disabled={addToFavoritesMutation.isPending}
                      variant="outline"
                      className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                    >
                      <FavoriteIcon className="!fill-none !stroke-current stroke-1 text-[var(--addi-color-500)]" />
                    </Button>
                  )}
                </div>

                <Button
                  className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white text-md font-semibold w-full"
                  onClick={handleJoinCourse}
                >
                  Join Course
                </Button>
              </div>
            )}

            {role === "student" && course.enrolled && (
              <Button
                className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white text-md font-semibold"
                onClick={() => router.push(`/student/course/${course.id}`)}
              >
                Access Course
              </Button>
            )}

            {role == "student" && course.enrolled && (
              <Button
                className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white text-md font-semibold mt-2"
                onClick={() => setReviewModalOpen(true)}
              >
                {currentUserReview ? "Update review" : "Add a review"}
              </Button>
            )}

            {role === "unauthenticated" && (
              <Button
                className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white text-md font-semibold"
                onClick={() => router.push("/auth")}
              >
                Sign in to join course
              </Button>
            )}
          </div>

          <div className="mb-5">
            <p className="flex flex-row gap-3 mb-1 text-sm items-center">
              <Video className="text-[var(--addi-color-500)]" size={20} />{" "}
              <span className="text-gray-400">
                {course!.numberOfVideos} recorded video
              </span>
            </p>

            <p className="flex flex-row gap-3 mb-1 text-sm items-center">
              <Clock className="text-[var(--addi-color-500)]" size={20} />{" "}
              <span className="text-gray-400">
                {course!.pricingModel.toString() === "SUBSCRIPTION"
                  ? "Subscription"
                  : course!.pricingModel.toString() === "ONE_TIME_PURCHASE"
                  ? "Full time access"
                  : "Free"}
              </span>
            </p>
            <p className="flex flex-row gap-3 mb-1 text-sm items-center">
              <File className="text-[var(--addi-color-500)]" size={20} />{" "}
              <span className="text-gray-400">
                {course!.numberOfDocuments} Documents
              </span>
            </p>
          </div>

          <div className="w-full p-5 border border-solid border-gray-300 rounded-lg bg-[var(--color-50)]">
            <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
              Have Any question ?
            </p>
            <p className="text-xs font-semibold mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              laboriosam tempore reiciendis numquam, voluptas ad placeat saepe.
              Vel totam provident sed quidem enim quam repellendus quo , dicta
              voluptatibus, quos molestias.
            </p>
            <Button variant={"link"} className="flex flex-row gap-2">
              <Phone className="text-green-500" /> 0000000000
            </Button>
            <Button variant={"link"} className="flex flex-row gap-2">
              <Mail className="text-red-500" /> example@example.example
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCourse;
