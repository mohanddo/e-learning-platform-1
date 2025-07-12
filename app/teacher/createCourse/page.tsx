"use client";

import { useState, ChangeEvent, useRef, useEffect } from "react";
import showAlert from "@/components/ui/AlertC";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { CourseCategory, PricingModel } from "@/types/types";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { X, Loader2, AlertTriangle } from "lucide-react";
import { BlockBlobClient } from "@azure/storage-blob";
import { uploadVideoToBlobStorage } from "@/utils";
import { useAppContext } from "@/context/context";
import { authApi as teacherApi } from "@/api/auth/teacherAuth.api";

const categories: CourseCategory[] = [
  "MATH",
  "SCIENCE",
  "HISTORY",
  "LANGUAGE",
  "PROGRAMMING",
  "PHYSICS",
];

const pricingModels: PricingModel[] = [
  "SUBSCRIPTION",
  "ONE_TIME_PURCHASE",
  "FREE",
];

export default function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<CourseCategory>("MATH");
  const [pricingModel, setPricingModel] =
    useState<PricingModel>("ONE_TIME_PURCHASE");
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoFileName, setVideoFileName] = useState<string>("");
  const [error, setError] = useState("");
  const [uploadVideoProgress, setUploadVideoProgress] = useState<number>(0);
  const [uploadImageProgress, setUploadImageProgress] = useState<number>(0);
  const [uploadImageStarted, setUploadImageStarted] = useState<boolean>(false);
  const [uploadVideoStarted, setUploadVideoStarted] = useState<boolean>(false);

  const isMounted = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const router = useRouter();
  const { setUser, setTeacher } = useAppContext();
  // Fetch teacher data
  const {
    data: teacher,
    isLoading: teacherLoading,
    isError: teacherError,
    error: teacherErrorObj,
    refetch,
  } = useQuery({
    queryKey: ["teacher"],
    queryFn: async () => {
      const data = await teacherApi.me();
      setTeacher(data);
      setUser(data);
      return data;
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const onVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
    setVideoFileName(file ? file.name : "");
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (videoFile) {
        setUploadVideoStarted(true);
        const blockBlobClient = new BlockBlobClient(
          `${teacher!.baseUrl}/${title}/${videoFile!.name}?${teacher!.sasToken}`
        );
        await uploadVideoToBlobStorage(
          videoFile,
          setUploadVideoProgress,
          blockBlobClient
        );
      }
      setUploadImageStarted(true);
      return await courseApi.createCourse(
        {
          title,
          description,
          category,
          pricingModel,
          price,
          imageUrl: imageFile
            ? `${teacher!.baseUrl}/${title}/${imageFile.name}`
            : null,
          introductionVideoUrl: videoFile
            ? `${teacher!.baseUrl}/${title}/${videoFile!.name}`
            : null,
        },
        teacher!,
        setUploadImageProgress,
        imageFile
      );
    },
    onSuccess: (data) => {
      showAlert("success", "Course created successfully!");
      if (isMounted.current) {
        setError("");
        router.push(`/teacher/course/${data}`);
      }
    },
    onError: () => {
      if (isMounted.current) {
        setError("Failed to create course. Please try again.");
        setUploadImageStarted(false);
      }
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Client-side validation
    if (!title.trim()) {
      setError("Course title is required.");
      return;
    }
    if (!description.trim()) {
      setError("Course description is required.");
      return;
    }
    if (!category) {
      setError("Course category is required.");
      return;
    }
    if (!pricingModel) {
      setError("Pricing model is required.");
      return;
    }
    if (
      (pricingModel === "ONE_TIME_PURCHASE" ||
        pricingModel === "SUBSCRIPTION") &&
      price <= 0
    ) {
      setError("Price must be greater than 0 for paid courses.");
      return;
    }
    if (pricingModel === "FREE" && price !== 0) {
      setError("Price must be 0 for free courses.");
      return;
    }
    setError("");
    mutation.mutate();
  };

  if (teacherLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Loader2
          className="animate-spin text-[var(--addi-color-500)] mb-4"
          size={40}
        />
        <span className="text-lg text-gray-500 font-medium">
          Loading teacher info...
        </span>
      </div>
    );
  }
  if (teacherError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[40vh]">
        <AlertTriangle className="text-red-500 mb-2" size={40} />
        <span className="text-lg text-red-500 font-semibold mb-1">
          Failed to load teacher info
        </span>
        <span className="text-sm text-gray-400 mb-4">
          {teacherErrorObj?.message || "Unknown error"}
        </span>
        <Button
          onClick={() => refetch()}
          className="bg-[var(--addi-color-500)] text-white font-bold hover:bg-[var(--addi-color-400)]"
        >
          Retry
        </Button>
      </div>
    );
  }
  if (!teacher) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto mt-24 mb-12 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--addi-color-500)]">
        Create a New Course
      </h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <label className="block font-semibold mb-1">
            Course Title<span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="e.g. Introduction to Algebra"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Course Description<span className="text-red-500">*</span>
          </label>
          <textarea
            className="bg-gray-50 rounded-md border border-gray-200 focus:border-[var(--addi-color-500)] focus:ring-1 focus:ring-[var(--addi-color-500)] focus:outline-none px-3 py-2 w-full transition-colors duration-200 min-h-[80px]"
            placeholder="Describe what students will learn, prerequisites, etc."
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            className="bg-gray-50 rounded-md border border-gray-200 focus:border-[var(--addi-color-500)] focus:ring-1 focus:ring-[var(--addi-color-500)] focus:outline-none px-3 py-2 w-full transition-colors duration-200"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value as CourseCategory)
            }
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0) + cat.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Choose the most relevant category for your course.
          </p>
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Pricing Model<span className="text-red-500">*</span>
          </label>
          <select
            className="bg-gray-50 rounded-md border border-gray-200 focus:border-[var(--addi-color-500)] focus:ring-1 focus:ring-[var(--addi-color-500)] focus:outline-none px-3 py-2 w-full transition-colors duration-200"
            value={pricingModel}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPricingModel(e.target.value as PricingModel)
            }
            required
          >
            {pricingModels.map((model) => (
              <option key={model} value={model}>
                {model === "ONE_TIME_PURCHASE"
                  ? "One-time purchase"
                  : model.charAt(0) +
                    model.slice(1).toLowerCase().replace("_", " ")}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Select how students will pay for this course.
          </p>
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Price (DA)<span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            placeholder="e.g. 2000"
            value={price}
            min={0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(Number(e.target.value))
            }
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Set the price in Algerian Dinar (DA). Enter 0 for a free course.
          </p>
        </div>

        <div>
          <label className="block font-semibold mb-1">Course Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={onImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[var(--addi-color-500)] file:text-white
              hover:file:bg-[var(--addi-color-400)] hover:file:cursor-pointer"
          />
          {imagePreview && (
            <div className="relative mt-2 inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-md max-h-40"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition-colors cursor-pointer"
                aria-label="Remove image"
              >
                <X size={18} className="text-gray-700" />
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Upload a course image (optional).
          </p>
        </div>

        {uploadImageStarted && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2 mb-2">
            <div
              className="bg-[var(--addi-color-500)] h-3 rounded-full transition-all duration-200"
              style={{ width: `${uploadImageProgress}%` }}
            ></div>
            <span className="block text-xs text-gray-600 text-center mt-1">
              Uploading Image: {uploadImageProgress.toFixed(0)}%
            </span>
          </div>
        )}

        <div>
          <label className="block font-semibold mb-1">Introduction Video</label>
          <input
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={onVideoChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[var(--addi-color-500)] file:text-white
              hover:file:bg-[var(--addi-color-400)] hover:file:cursor-pointer"
          />
          {videoFileName && (
            <div className="flex items-center mt-2 gap-2">
              <span className="text-sm text-gray-700">{videoFileName}</span>
              <button
                type="button"
                onClick={() => {
                  setVideoFile(null);
                  setVideoFileName("");
                  if (videoInputRef.current) videoInputRef.current.value = "";
                }}
                className="bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition-colors cursor-pointer"
                aria-label="Remove video"
              >
                <X size={18} className="text-gray-700" />
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Upload an introduction video (optional).
          </p>
        </div>
        {uploadVideoStarted && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-[var(--addi-color-500)] h-3 rounded-full transition-all duration-200"
              style={{ width: `${uploadVideoProgress}%` }}
            ></div>
            <span className="block text-xs text-gray-600 text-center mt-1">
              Uploading video: {uploadVideoProgress.toFixed(0)}%
            </span>
          </div>
        )}
        <Button
          type="submit"
          className="bg-[var(--addi-color-500)] text-white font-bold hover:bg-[var(--addi-color-400)] mt-2"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Course"}
        </Button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}
