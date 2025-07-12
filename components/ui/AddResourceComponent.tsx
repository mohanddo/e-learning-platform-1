import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { useCourse } from "@/context/CourseContext";
import showAlert from "./AlertC";
import { useAppContext } from "@/context/context";
import { getVideoDuration, uploadVideoToBlobStorage } from "@/utils";
import { BlockBlobClient } from "@azure/storage-blob";

interface AddResourceComponentProps {
  onClose: () => void;
  setIsUploadingResource: (val: boolean) => void;
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
}

const AddResourceComponent: React.FC<AddResourceComponentProps> = ({
  onClose,
  setIsUploadingResource,
  setUploadProgress,
}) => {
  const { course, refetch } = useCourse();
  const { teacher } = useAppContext();
  const [type, setType] = useState<"video" | "document">("video");
  const [title, setTitle] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [chapterId, setChapterId] = useState<number>(course!.chapters[0].id);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const addVideoMutation = useMutation({
    mutationFn: async () => {
      onClose();
      setIsUploadingResource(true);
      setUploadProgress(0);
      const blobUrl = `${teacher!.baseUrl}/${course!.id}/${chapterId}/${
        file!.name
      }?${teacher!.sasToken}`;

      const duration = await getVideoDuration(file!);
      const blockBlobClient = new BlockBlobClient(blobUrl);
      await uploadVideoToBlobStorage(file!, setUploadProgress, blockBlobClient);
      await courseApi.addVideo({
        title,
        duration,
        isFree,
        downloadUrl: `${teacher!.baseUrl}/${course!.id}/${chapterId}/${
          file!.name
        }`,
        courseId: course!.id,
        chapterId,
      });
    },
    onSuccess: async () => {
      setIsUploadingResource(false);
      setUploadProgress(100);
      showAlert("success", "Video uploaded successfully.");
      await refetch();
    },
    onError: () => {
      showAlert("error", "Failed to upload video, please try again.");
      setIsUploadingResource(false);
    },
  });

  const addDocumentMutation = useMutation({
    mutationFn: async () => {
      onClose();
      setIsUploadingResource(true);
      setUploadProgress(0);

      await courseApi.addDocument(
        {
          title,
          isFree,
          downloadUrl: `${teacher!.baseUrl}/${course!.id}/${chapterId}/${
            file!.name
          }`,
          courseId: course!.id,
          chapterId,
        },
        teacher!,
        file!
      );
    },
    onSuccess: async () => {
      setIsUploadingResource(false);
      setUploadProgress(100);
      showAlert("success", "Document uploaded successfully.");
      await refetch();
    },
    onError: () => {
      showAlert("error", "Failed to upload Document, please try again.");
      setIsUploadingResource(false);
    },
  });

  const onCreate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required";
    if (!file) newErrors.file = "File is required";
    if (!chapterId) newErrors.chapterId = "Chapter is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) throw new Error("Validation error");

    if (type === "video") {
      addVideoMutation.mutate();
    } else {
      addDocumentMutation.mutate();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[950] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl w-full max-w-sm border border-gray-200 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Resource</h2>
        <form className="space-y-4">
          <div>
            <label className="font-medium text-gray-700">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "video" | "document")}
              className="ml-2 border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--addi-color-500)] w-32"
            >
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-gray-700">Chapter:</label>
            <select
              value={chapterId}
              onChange={(e) => setChapterId(Number(e.target.value))}
              className="ml-2 border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--addi-color-500)] w-40"
            >
              {course!.chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.title}
                </option>
              ))}
            </select>
            {errors.chapterId && (
              <div className="text-red-500 text-xs mt-1">
                {errors.chapterId}
              </div>
            )}
          </div>
          <div>
            <label className="font-medium text-gray-700">Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 py-2 px-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-[var(--addi-color-500)] mt-1"
            />
            {errors.title && (
              <div className="text-red-500 text-xs mt-1">{errors.title}</div>
            )}
          </div>
          <div>
            <label className="inline-flex items-center font-medium text-gray-700">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className="mr-2 accent-[var(--addi-color-500)]"
              />
              Free
            </label>
          </div>
          <div>
            <label className="font-medium text-gray-700">File:</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block mt-1 border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-[var(--addi-color-500)]"
              accept={type === "video" ? "video/*" : ".pdf"}
            />
            {errors.file && (
              <div className="text-red-500 text-xs mt-1">{errors.file}</div>
            )}
          </div>
          <div className="flex gap-2 mt-6">
            <Button
              onClick={onClose}
              variant="ghost"
              className="border border-gray-300 text-gray-700 hover:bg-gray-100"
              type="button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onCreate()}
              disabled={
                addVideoMutation.isPending || addDocumentMutation.isPending
              }
              className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white  px-6 py-2 rounded shadow disabled:opacity-60"
              type="button"
            >
              {addVideoMutation.isPending || addDocumentMutation.isPending
                ? "Saving..."
                : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceComponent;
