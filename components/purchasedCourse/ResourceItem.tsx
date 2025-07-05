import { Resource, Course, Chapter } from "@/types/types";
import {
  Video as VideoIcon,
  File,
  Check,
  GripVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { useCourse } from "@/context/CourseContext";
import { formatSecondsToMMSS } from "@/utils";
import { useAddFinishedResourceMutation } from "@/hooks/useAddFinishedResourceMutation";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { courseApi } from "@/api/course.api";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface ResourceItemProps {
  resource: Resource;
  isVideo?: boolean;
  chapter: Chapter;
  id: number;
}

const ResourceItem: React.FC<ResourceItemProps> = ({
  resource,
  isVideo = false,
  chapter,
  id,
}) => {
  const {
    activeResource,
    course,
    setActiveResource,
    setCourse,
    setResourceToDelete,
    setIsDeleteModalOpen,
    setResourceToUpdate,
    setIsUpdateResourceModalOpen,
  } = useCourse();
  const addFinishedResourceMutation = useAddFinishedResourceMutation();

  const deleteFinishedResourceMutation = useMutation({
    mutationFn: async (resourceId: number) => {
      courseApi.deleteFinishedResource(resourceId);
    },
  });

  const handleResourceCheckboxChange = (resource: Resource) => {
    if (resource.isFinished) {
      deleteFinishedResourceMutation.mutate(resource.id);
    } else {
      addFinishedResourceMutation.mutate({
        courseId: course!.id,
        chapterId: chapter.id,
        resourceId: resource.id,
      });
    }
  };

  const handleCheckboxChange = (resourceId: number) => {
    if (resourceId == activeResource?.id) {
      setActiveResource((prevActiveResource: Resource | null) => {
        if (!prevActiveResource) return prevActiveResource;
        return {
          ...prevActiveResource,
          isFinished: !prevActiveResource.isFinished,
        };
      });
    }
    setCourse((prevCourse: Course | null) => {
      if (!prevCourse) return prevCourse;

      return {
        ...prevCourse,
        chapters: prevCourse.chapters.map((chapterParam) => {
          if (chapterParam.id !== chapter.id) return chapterParam;

          return {
            ...chapterParam,
            resources: chapterParam.resources.map((v) =>
              v.id === resourceId ? { ...v, isFinished: !v.isFinished } : v
            ),
          };
        }),
      };
    });
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`flex items-stretch gap-2 p-2 rounded cursor-pointer hover:bg-[var(--color-100)]
        ${activeResource?.id == resource.id ? "bg-[var(--color-100)]" : ""}
      `}
      onClick={() => setActiveResource(resource)}
      ref={setNodeRef}
      style={style}
    >
      {course!.enrolled && (
        <label
          className="relative flex items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            checked={!!resource.isFinished}
            onChange={(e) => {
              e.stopPropagation();
              handleResourceCheckboxChange(resource);
              handleCheckboxChange(resource.id);
            }}
            onClick={(e) => e.stopPropagation()}
            className="peer sr-only"
            tabIndex={-1}
          />
          <span
            className={`
              w-4 h-4 flex items-center justify-center border-2 border-gray-800 rounded-sm
              transition-all duration-200
              peer-checked:bg-[var(--addi-color-500)]
              peer-checked:border-[var(--addi-color-500)]
              bg-white
            `}
          >
            <Check className="text-white" />
          </span>
        </label>
      )}
      <div className="flex justify-start flex-col">
        {isVideo ? (
          <VideoIcon className="text-[var(--addi-color-500)]" size={18} />
        ) : (
          <File className="text-[var(--addi-color-500)]" size={18} />
        )}
      </div>
      <span className="truncate flex-1">
        {resource.title}
        {isVideo && course!.ownsCourse && (
          <span className="block text-xs text-gray-500 min-w-[48px] text-left mt-1">
            {formatSecondsToMMSS(resource.duration!)}
          </span>
        )}
      </span>
      {course!.ownsCourse && (
        <>
          <div
            className="ml-1 cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
            {...listeners}
            {...attributes}
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>

          <div
            className="ml-1 rounded  cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setResourceToUpdate(resource);
              setIsUpdateResourceModalOpen(true);
            }}
            aria-label="Edit chapter title"
          >
            <Pencil className="w-4 h-4 text-gray-500" />
          </div>

          <div
            className="ml-1 rounded  cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setResourceToDelete(resource);
              setIsDeleteModalOpen(true);
            }}
            aria-label="Delete chapter"
          >
            <Trash className="w-4 h-4 text-red-500" />
          </div>
        </>
      )}
      {isVideo && !course!.ownsCourse && (
        <span className="ml-auto text-xs text-gray-500 min-w-[48px] text-right">
          {formatSecondsToMMSS(resource.duration!)}
        </span>
      )}
    </div>
  );
};

export default ResourceItem;
