import React, { useState } from "react";
import { Course, Video, Document } from "@/components/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { Video as VideoIcon, File, Check, X } from "lucide-react";

interface CourseSidebarProps {
  course: Course;
  onClose?: () => void;
}

// Helper to deep clone chapters with videos/documents
function cloneChapters(chapters: Course["chapters"]) {
  return chapters.map((chapter) => ({
    ...chapter,
    videos: chapter.videos.map((v) => ({ ...v })),
    documents: chapter.documents.map((d) => ({ ...d })),
  }));
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course, onClose }) => {
  // Find the first video as default
  const firstVideo = course.chapters.flatMap((c) => c.videos)[0] || null;
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(firstVideo);
  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false);
  // Local state for studied status
  const [chapters, setChapters] = useState(() =>
    cloneChapters(course.chapters)
  );
  // Animation state
  const [isClosing, setIsClosing] = useState(false);

  // Helper to handle video click
  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setVideoPlayerOpen(true);
  };

  // Helper to handle document click
  const handleDocumentClick = (doc: Document) => {
    window.open(doc.downloadUrl, "_blank");
  };

  // Toggle studied status for video or document
  const handleCheckboxChange = (
    chapterId: number,
    resourceType: "video" | "document",
    resourceId: number
  ) => {
    setChapters((prev) =>
      prev.map((chapter) => {
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
      })
    );
  };

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true);
  };

  return (
    <aside
      className={`w-[350px] min-w-[300px] max-w-[400px] h-screen bg-white border-l border-gray-200 flex flex-col shadow-lg fixed right-0 top-0  mt-[15vh] transition-transform duration-300 ${
        isClosing ? "translate-x-full" : "translate-x-0"
      }`}
      onTransitionEnd={() => {
        if (isClosing && onClose) onClose();
      }}
    >
      {/* Header */}
      <div className="flex-0 p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-base font-bold">Course Content</h2>
        <button
          onClick={handleClose}
          className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close sidebar"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* Accordion for chapters/sections */}
      <div className="flex-1 overflow-y-auto p-4">
        <Accordion type="single" collapsible className="w-full">
          {[...chapters].map((chapter) => (
            <AccordionItem
              key={chapter.id}
              value={chapter.id.toString()}
              className="mb-2 border-none shadow-sm rounded-lg cursor-pointer"
            >
              <AccordionTrigger className="py-3 px-4 text-base font-bold data-[state=open]:bg-[var(--color-100)]">
                {chapter.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                <div className="flex flex-col gap-2">
                  {chapter.videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[var(--color-100)]"
                      onClick={() => handleVideoClick(video)}
                    >
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!video.isFinished}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleCheckboxChange(chapter.id, "video", video.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="peer sr-only"
                          tabIndex={-1}
                        />
                        <span
                          className={`
                            w-5 h-5 flex items-center justify-center rounded-md border-2 border-gray-300
                            transition-all duration-200
                            peer-checked:bg-[var(--addi-color-500)]
                            peer-checked:border-[var(--addi-color-500)]
                            bg-white
                          `}
                        >
                          <Check
                            className="text-white w-4 h-4 opacity-0 scale-75 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100"
                            strokeWidth={3}
                          />
                        </span>
                      </label>
                      <VideoIcon
                        className="text-[var(--addi-color-500)]"
                        size={18}
                      />
                      <span className="truncate">{video.title}</span>
                    </div>
                  ))}
                  {chapter.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[var(--color-100)] text-gray-700"
                      onClick={() => handleDocumentClick(doc)}
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
                            w-5 h-5 flex items-center justify-center rounded-md border-2 border-gray-300
                            transition-all duration-200
                            peer-checked:bg-[var(--addi-color-500)]
                            peer-checked:border-[var(--addi-color-500)]
                            bg-white
                          `}
                        >
                          <Check
                            className="text-white w-4 h-4 opacity-0 scale-75 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100"
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
          ))}
        </Accordion>
      </div>
    </aside>
  );
};

export default CourseSidebar;
