import React, { useState } from "react";
import { Course, Resource } from "@/types/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Video as VideoIcon, File, Check, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { formatSecondsToMMSS } from "@/utils";
import { useCourse } from "@/context/CourseContext";
import { useAddFinishedResourceMutation } from "@/hooks/useAddFinishedResourceMutation";

interface CourseSidebarProps {
  onClose?: () => void;
  isHeaderVisible: boolean;
  isSidebarOpen: boolean;
  role: "student" | "teacher";
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  onClose,
  isHeaderVisible,
  isSidebarOpen,
  role,
}) => {
  const { course, setActiveResource, activeResource, setCourse } = useCourse();
  const handleResourceClick = (resource: Resource) => {
    setActiveResource(resource);
  };

  // const handleDocumentClick = (doc: Document) => {
  //   window.open(doc.downloadUrl, "_blank");
  // };

  const addFinishedResourceMutation = useAddFinishedResourceMutation();

  const deleteFinishedResourceMutation = useMutation({
    mutationFn: async (resourceId: number) => {
      courseApi.deleteFinishedResource(resourceId);
    },
  });

  // Toggle studied status for video or document
  const handleCheckboxChange = (
    chapterId: number,
    resourceType: "video" | "document",
    resourceId: number
  ) => {
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
        chapters: prevCourse.chapters.map((chapter) => {
          if (chapter.id !== chapterId) return chapter;

          if (resourceType === "video") {
            return {
              ...chapter,
              videos: chapter.videos.map((v) =>
                v.id === resourceId ? { ...v, isFinished: !v.isFinished } : v
              ),
            };
          } else {
            return {
              ...chapter,
              documents: chapter.documents.map((d) =>
                d.id === resourceId ? { ...d, isFinished: !d.isFinished } : d
              ),
            };
          }
        }),
      };
    });
  };

  return (
    <aside
      className={`w-[30vw] min-w-[300px] max-w-[30vw] h-screen bg-white border-l border-gray-200 flex flex-col shadow-lg fixed right-0 top-0 transition-all duration-300 ${
        isHeaderVisible ? "mt-[64px]" : "mt-0"
      } ${!isSidebarOpen ? "translate-x-full" : "translate-x-0"} `}
      onTransitionEnd={() => {
        if (!isSidebarOpen && onClose) onClose();
      }}
    >
      {/* Header */}
      <div className="flex-0 p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-base font-bold">Course Content</h2>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close sidebar"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Accordion type="single" collapsible className="w-full">
          {[...course!.chapters].map((chapter) => {
            // Calculate chapter stats
            const chapterTotalResources =
              chapter.videos.length + chapter.documents.length;
            const chapterCompletedResources =
              chapter.videos.filter((v) => v.isFinished).length +
              chapter.documents.filter((d) => d.isFinished).length;
            const chapterTotalSeconds = chapter.videos.reduce(
              (sum, v) => sum + (v.duration || 0),
              0
            );

            const chapterHours = Math.floor(chapterTotalSeconds / 3600);
            const chapterMinutes = Math.floor(
              (chapterTotalSeconds % 3600) / 60
            );
            const chapterFormattedDuration =
              chapterHours > 0
                ? `${chapterHours} h ${chapterMinutes} min`
                : `${chapterMinutes} min`;

            return (
              <AccordionItem
                key={chapter.id}
                value={chapter.id.toString()}
                className="mb-2 border-none shadow-sm rounded-lg cursor-pointer"
              >
                <AccordionTrigger className="py-3 px-4 text-base font-bold data-[state=open]:bg-[var(--color-100)] cursor-pointer">
                  <div className="flex flex-col justify-between w-full">
                    <span>{chapter.title}</span>
                    <span className="text-xs font-medium text-gray-600">
                      {chapterCompletedResources} / {chapterTotalResources} |{" "}
                      {chapterFormattedDuration}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  <div className="flex flex-col gap-2">
                    {chapter.videos.map((video) => (
                      <div
                        key={video.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[var(--color-100)]
                          ${
                            activeResource?.id == video.id
                              ? "bg-[var(--color-100)]"
                              : ""
                          }
                        `}
                        onClick={() => handleResourceClick(video)}
                      >
                        {role === "student" && (
                          <label className="relative flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={video.isFinished}
                              onChange={(e) => {
                                e.stopPropagation();
                                if (video.isFinished) {
                                  deleteFinishedResourceMutation.mutate(
                                    video.id
                                  );
                                } else {
                                  addFinishedResourceMutation.mutate({
                                    courseId: course!.id,
                                    chapterId: chapter.id,
                                    resourceId: video.id,
                                  });
                                }
                                handleCheckboxChange(
                                  chapter.id,
                                  "video",
                                  video.id
                                );
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
                        <VideoIcon
                          className="text-[var(--addi-color-500)]"
                          size={18}
                        />
                        <span className="truncate flex-1">{video.title}</span>
                        <span className="ml-auto text-xs text-gray-500 min-w-[48px] text-right">
                          {formatSecondsToMMSS(video.duration)}
                        </span>
                      </div>
                    ))}
                    {chapter.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[var(--color-100)] text-gray-700"
                        onClick={() => handleResourceClick(doc)}
                      >
                        <label className="relative flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!doc.isFinished}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleCheckboxChange(
                                chapter.id,
                                "document",
                                doc.id
                              );
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="peer sr-only"
                            tabIndex={-1}
                          />
                          <span
                            className={`
                              w-4 h-4 flex items-center justify-center border-2 border-gray-800
                              transition-all duration-200
                              peer-checked:bg-[var(--addi-color-500)]
                              peer-checked:border-[var(--addi-color-500)]
                              bg-white
                            `}
                          >
                            <Check
                              className="text-white w-2.5 h-2.5 opacity-0 scale-75 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100"
                              strokeWidth={3}
                            />
                          </span>
                        </label>
                        <File
                          className="text-[var(--addi-color-500)]"
                          size={18}
                        />
                        <span className="truncate">{doc.title}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </aside>
  );
};

export default CourseSidebar;
