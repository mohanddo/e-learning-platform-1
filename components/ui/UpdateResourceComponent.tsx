import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { useCourse } from "@/context/CourseContext";
import showAlert from "./AlertC";
import { BlockBlobClient } from "@azure/storage-blob";
import { useAppContext } from "@/context/context";
import { findChapterId, getVideoDuration } from "@/utils";
import axios from "axios";

interface AddResourceComponentProps {
  onClose: () => void;
  setIsUploadingResource: (val: boolean) => void;
  setUploadProgress: (val: number) => void;
}

const AddResourceComponent: React.FC<AddResourceComponentProps> = ({
  onClose,
  setIsUploadingResource,
  setUploadProgress,
}) => {
  const { course, refetch, resourceToUpdate } = useCourse();
  const { teacher } = useAppContext();
  const [title, setTitle] = useState(resourceToUpdate!.title);
  const [isFree, setIsFree] = useState(resourceToUpdate!.free);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const uploadVideoToBlobStorage = async (blobUrl: string, video: File) => {
    const blockBlobClient = new BlockBlobClient(blobUrl);

    await blockBlobClient.uploadData(video, {
      blobHTTPHeaders: { blobContentType: video.type },
      onProgress: (progress) => {
        setUploadProgress((progress.loadedBytes / video.size) * 100);
        console.log(`Uploaded ${progress.loadedBytes} of ${video.size}`);
      },
      maxSingleShotSize: 4 * 1024 * 1024, // 4MB
      blockSize: 4 * 1024 * 1024, // 4MB per block
      concurrency: 4, // 4 parallel uploads
    });
  };

  const uploadDocumentToBlobStorage = async (
    blobUrl: string,
    document: File
  ) => {
    await axios.put(blobUrl, document, {
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": document.type,
      },
    });
  };

  const updateResourceMutation = useMutation({
    mutationFn: async () => {
      const chapterId = findChapterId(resourceToUpdate, course?.chapters)!;

      let duration: number | null = null;
      if (file !== null) {
        const blobUrl = `${teacher!.baseUrl}/${course!.id}/${chapterId}/${
          file.name
        }?${teacher!.sasToken}`;
        onClose();
        setIsUploadingResource(true);
        setUploadProgress(0);
        if (resourceToUpdate!.duration !== null) {
          duration = await getVideoDuration(file!);
          await uploadVideoToBlobStorage(blobUrl, file!);
        } else {
          await uploadDocumentToBlobStorage(blobUrl, file!);
        }
      }

      await courseApi.updateResource({
        title: title,
        duration: duration,
        isFree: isFree,
        courseId: course!.id,
        chapterId: chapterId,
        resourceId: resourceToUpdate!.id,
      });
    },
    onSuccess: async () => {
      if (file !== null) {
        setIsUploadingResource(false);
        setUploadProgress(100);
      }

      onClose();
      showAlert(
        "success",
        `${
          resourceToUpdate!.duration !== null ? "Video" : "Document"
        } updated successfully.`
      );
      await refetch();
    },
    onError: (e: Error) => {
      onClose();
      showAlert(
        "error",
        `Failed to update ${
          resourceToUpdate!.duration !== null ? "video" : "document"
        }, please try again.`
      );
      setIsUploadingResource(false);
    },
  });

  const onCreate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) throw new Error("Validation error");

    updateResourceMutation.mutate();
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Update Resource
        </h2>
        <form className="space-y-4">
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
              accept={
                resourceToUpdate!.duration !== null
                  ? "video/*"
                  : "application/pdf"
              }
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
              disabled={updateResourceMutation.isPending}
              className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white  px-6 py-2 rounded shadow disabled:opacity-60"
              type="button"
            >
              {updateResourceMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceComponent;
