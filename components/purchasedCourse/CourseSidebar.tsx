import React, { useEffect, useState } from "react";

import { Accordion } from "@/components/ui/accordion";
import { X } from "lucide-react";
import { useCourse } from "@/context/CourseContext";
import ChapterItem from "./ChapterItem";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { ReorderChaptersRequest } from "@/types/request";

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
}) => {
  const { course, setIsAddModalOpen, setIsAddResourceModalOpen } = useCourse();

  // State for chapter IDs
  const [items, setItems] = useState<number[]>([]);

  // Update items when course changes
  useEffect(() => {
    if (course?.chapters) {
      setItems(course.chapters.map((_chapter, index) => index));
    }
  }, [course]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(Number(active.id));
      const newIndex = items.indexOf(Number(over.id));
      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);

      reorderChaptersMutationMutation.mutate({
        courseId: course!.id,
        orderedChapterIds: newItems.map((item) => course!.chapters[item].id),
      });
    }
  }

  const reorderChaptersMutationMutation = useMutation({
    mutationFn: async (request: ReorderChaptersRequest) => {
      await courseApi.reorderChapters(request);
    },
  });

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

      {/* Add Chapter Button */}
      {course!.ownsCourse && (
        <div className="p-4 border-b border-gray-100 flex items-center justify-center gap-2">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[var(--addi-color-500)] text-white font-bold"
          >
            + Add Chapter
          </Button>

          <Button
            onClick={() => setIsAddResourceModalOpen(true)}
            className="bg-[var(--addi-color-500)] text-white font-bold"
          >
            + Add Resource
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <Accordion type="single" collapsible className="w-full">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => {
                if (!course!.chapters[item]) return;
                return (
                  <ChapterItem
                    key={item}
                    id={item}
                    chapter={course!.chapters[item]}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        </Accordion>
      </div>
    </aside>
  );
};

export default CourseSidebar;
