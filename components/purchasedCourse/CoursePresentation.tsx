import React, { useState, useRef, useEffect } from "react";
import { Star, Clock, Tag, Edit, Settings } from "lucide-react";
import { calculateCourseTotalHours } from "@/utils";
import { Button } from "../ui/button";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ProfileImage from "@/components/ui/profile-image";
import { useCourse } from "@/context/CourseContext";
import { useAppContext } from "@/context/context";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { UpdateCourseRequest } from "@/types/request";
import { CourseCategory } from "@/types/types";
import showAlert from "@/components/ui/AlertC";
import UpdateComponent from "@/components/ui/UpdateComponent";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

const CoursePresentation: React.FC = () => {
  const { course, refetch } = useCourse();
  const { teacher } = useAppContext();
  const isMounted = useRef(false);

  // Edit states
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showEditPricing, setShowEditPricing] = useState(false);

  const resetShowComponentsState = () => {
    setShowEditTitle(false);
    setShowEditDescription(false);
    setShowEditPricing(false);
  };

  const resetFormState = () => {
    // Reset form states to original course values
    setTitle(course!.title);
    setDescription(course!.description);
    setPrice(course!.price);
    setDiscountPercentage(course!.discountPercentage || 0);
    setDiscountExpirationDate(
      course!.discountExpirationDate
        ? new Date(course!.discountExpirationDate).toISOString().split("T")[0]
        : ""
    );
    setCategory(course!.category);
  };
  // Form states
  const [title, setTitle] = useState(course!.title);
  const [description, setDescription] = useState(course!.description);
  const [price, setPrice] = useState(course!.price);
  const [discountPercentage, setDiscountPercentage] = useState(
    course!.discountPercentage || 0
  );
  const [discountExpirationDate, setDiscountExpirationDate] = useState(
    course!.discountExpirationDate
      ? new Date(course!.discountExpirationDate).toISOString().split("T")[0]
      : ""
  );
  const [category, setCategory] = useState(course!.category);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Calculate discounted price
  const discountedPrice = course!.discountPercentage
    ? course!.price - (course!.price * course!.discountPercentage) / 100
    : course!.price;

  // Update course mutation
  const updateCourseMutation = useMutation({
    mutationFn: async () => {
      const request: UpdateCourseRequest = {
        courseId: course!.id,
        title: title,
        description: description,

        category: category,
        price: price,
        discountPercentage: discountPercentage,
        discountExpirationDate: discountExpirationDate || null,
        imageUrl: course!.imageUrl?.split("?")[0],
        introductionVideoUrl: course!.introductionVideoUrl?.split("?")[0],
      };
      await courseApi.updateCourse(request);
    },
    onSuccess: async () => {
      await refetch();
      showAlert("success", "Course updated successfully!");
      resetShowComponentsState();
    },
    onError: () => {
      showAlert("error", "Failed to update course. Please try again.");
      resetShowComponentsState();
      resetFormState();
    },
  });

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Title & Description */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">{course!.title}</h1>
          {course!.ownsCourse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEditTitle(true)}
              className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-start justify-between">
          <p className="text-base text-gray-700 mb-4 flex-1">
            {course!.description}
          </p>
          {course!.ownsCourse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEditDescription(true)}
              className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors ml-2"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap gap-6 text-sm items-center">
          <span className="flex items-center gap-1">
            <span className="font-bold text-yellow-500">
              {course!.rating.toFixed(1)}
            </span>
            <Star className="w-4 h-4 text-yellow-500" fill="#facc15" />
            <span>({course!.numberOfReviews} reviews)</span>
          </span>
          <span>{course!.numberOfStudents} students</span>
          <span>{calculateCourseTotalHours(course!)} hours</span>
          <span>{course!.numberOfVideos} videos</span>
          <span>{course!.numberOfDocuments} documents</span>
        </div>
      </div>

      {/* Price & Discount Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[var(--addi-color-500)]" />
            <span className="text-lg font-semibold text-gray-900">Price:</span>
          </div>
          {course!.ownsCourse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEditPricing(true)}
              className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-baseline gap-3">
          {course!.discountPercentage ? (
            <>
              <span className="text-2xl font-bold text-green-600">
                {discountedPrice.toFixed(0)} DA
              </span>
              <span className="text-lg text-gray-400 line-through">
                {course!.price} DA
              </span>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-semibold">
                -{course!.discountPercentage}% OFF
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              {course!.price} DA
            </span>
          )}
        </div>

        {/* Discount Expiration */}
        {course!.discountExpirationDate && (
          <div className="flex items-center gap-2 mt-3 bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg">
            <Clock size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              Discount expires on{" "}
              {new Date(course!.discountExpirationDate).toLocaleDateString(
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
      </div>

      {/* Teacher Info */}
      <div className="flex items-center gap-6 bg-gray-50 p-4 rounded">
        <ProfileImage
          src={`${profilePicsEndPoint}/${course!.teacher.id}?${
            course!.teacher.sasTokenForReadingProfilePic
          }`}
          firstName={course!.teacher.firstName}
          lastName={course!.teacher.lastName}
          className="mr-2"
          size="lg"
        />
        <div>
          <div className="font-bold text-lg">
            {course!.teacher.firstName} {course!.teacher.lastName}
          </div>
          {course!.teacher.description && (
            <div className="text-md text-gray-600 mb-3 mt-1">
              {course!.teacher.description}
            </div>
          )}
          {(course!.teacher.facebookLink ||
            course!.teacher.youtubeLink ||
            course!.teacher.instagramLink) && (
            <div className="flex gap-2 mt-1">
              {course!.teacher.facebookLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={course!.teacher.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}
              {course!.teacher.youtubeLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={course!.teacher.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTubeIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}
              {course!.teacher.instagramLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={course!.teacher.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Title Modal using UpdateComponent */}
      {showEditTitle && (
        <UpdateComponent
          onClose={() => {
            setShowEditTitle(false);
            resetFormState();
          }}
          title="Edit Course Title"
          text={title}
          placeHolder="Enter course title..."
          mutation={updateCourseMutation}
          onChange={(text: string) => setTitle(text)}
        />
      )}

      {/* Edit Description Modal using UpdateComponent */}
      {showEditDescription && (
        <UpdateComponent
          onClose={() => {
            setShowEditDescription(false);
            resetFormState();
          }}
          title="Edit Course Description"
          text={description}
          placeHolder="Enter course description..."
          mutation={updateCourseMutation}
          onChange={(text: string) => setDescription(text)}
        />
      )}

      {/* Edit Pricing Modal */}
      {showEditPricing && (
        <div
          className="fixed inset-0 z-[950] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => {
            setShowEditPricing(false);
            resetFormState();
          }}
        >
          <div
            className="relative w-full max-w-lg mx-4 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-lg font-bold">Edit Course Pricing</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowEditPricing(false);
                  resetFormState();
                }}
                className="text-gray-400 hover:text-black transition-all duration-200 cursor-pointer"
              >
                <span className="text-xl">×</span>
              </Button>
            </div>
            <div className="px-6 py-4 space-y-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as CourseCategory)
                  }
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={"MATH"}>Math</option>
                  <option value={"SCIENCE"}>Science</option>
                  <option value={"HISTORY"}>History</option>
                  <option value={"LANGUAGE"}>Language</option>
                  <option value={"PHYSICS"}>Physics</option>
                  <option value={"PROGRAMMING"}>Programming</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (DA)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price..."
                  min="0"
                />
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={discountPercentage}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (Number.isInteger(value) && value >= 0 && value <= 100) {
                      setDiscountPercentage(value);
                    }
                  }}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter discount percentage..."
                  min="0"
                  max="100"
                />
              </div>

              {/* Discount Expiration Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Expiration Date
                </label>
                <input
                  type="date"
                  value={discountExpirationDate}
                  onChange={(e) => setDiscountExpirationDate(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
              <Button
                variant="ghost"
                className="text-[var(--addi-color-500)] font-bold"
                onClick={() => {
                  setShowEditPricing(false);
                  resetFormState();
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-[var(--addi-color-500)] text-white font-bold hover:bg-[var(--addi-color-400)]"
                onClick={() => updateCourseMutation.mutate()}
                disabled={updateCourseMutation.isPending}
              >
                {updateCourseMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePresentation;
