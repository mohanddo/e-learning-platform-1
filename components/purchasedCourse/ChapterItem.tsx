import React, { useEffect, useState } from "react";
import { Chapter, Resource } from "@/types/types";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GripVertical, Pencil, Trash } from "lucide-react";
import { useCourse } from "@/context/CourseContext";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ResourceItem from "./ResourceItem";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { courseApi } from "@/api/course.api";
import { ReorderResourcesRequest } from "@/types/request";
import { useMutation } from "@tanstack/react-query";

interface ChapterItemProps {
  chapter: Chapter;
  id: number;
}

const ChapterItem: React.FC<ChapterItemProps> = ({ chapter, id }) => {
  const {
    course,
    setChapterToUpdate,
    setIsUpdateModalOpen,
    setIsDeleteModalOpen,
    setChapterToDelete,
  } = useCourse();

  // Calculate chapter stats
  const chapterTotalResources = chapter.resources.length;
  const chapterCompletedResources = chapter.resources.filter(
    (v) => v.isFinished
  ).length;
  const chapterTotalSeconds = chapter.resources.reduce(
    (sum, v) => sum + (v.duration || 0),
    0
  );

  const chapterHours = Math.floor(chapterTotalSeconds / 3600);
  const chapterMinutes = Math.floor((chapterTotalSeconds % 3600) / 60);
  const chapterFormattedDuration =
    chapterHours > 0
      ? `${chapterHours} h ${chapterMinutes} min`
      : `${chapterMinutes} min`;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [items, setItems] = useState<number[]>([]);

  // Update items when course changes
  useEffect(() => {
    setItems(chapter.resources.map((_chapter, index) => index));
  }, [course, chapter]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(Number(active.id));
      const newIndex = items.indexOf(Number(over.id));
      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);

      reorderResourcesMutation.mutate({
        chapterId: chapter.id,
        courseId: course!.id,
        orderedResourceIds: newItems.map((item) => chapter.resources[item].id),
      });
    }
  }

  const reorderResourcesMutation = useMutation({
    mutationFn: async (request: ReorderResourcesRequest) => {
      await courseApi.reorderResources(request);
    },
  });

  return (
    <AccordionItem
      key={chapter.id}
      value={chapter.id.toString()}
      className="mb-2 border-none shadow-sm rounded-lg cursor-pointer"
      ref={setNodeRef}
      style={style}
    >
      <AccordionTrigger className="py-3 px-4 text-base font-bold data-[state=open]:bg-[var(--color-100)] cursor-pointer">
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col justify-between flex-1">
            <span className="flex items-center gap-2">{chapter.title}</span>

            <span className="text-xs font-medium text-gray-600">
              {chapterCompletedResources} / {chapterTotalResources} |{" "}
              {chapterFormattedDuration}
            </span>
          </div>
          {course!.ownsCourse && (
            <>
              <div
                {...listeners}
                {...attributes}
                className="ml-2 p-1 cursor-grab active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>

              <div
                className="ml-2 p-1 rounded hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setChapterToUpdate(chapter);
                  setIsUpdateModalOpen(true);
                }}
                aria-label="Edit chapter title"
              >
                <Pencil className="w-4 h-4 text-gray-500" />
              </div>

              <div
                className="ml-2 p-1 rounded hover:bg-red-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setChapterToDelete(chapter);
                  setIsDeleteModalOpen(true);
                }}
                aria-label="Delete chapter"
              >
                <Trash className="w-4 h-4 text-red-500" />
              </div>
            </>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-2">
        <div className="flex flex-col gap-2">
          {chapter.resources.length === 0 && (
            <div className="flex flex-col items-center justify-center text-gray-400 py-6">
              <span className="text-2xl mb-2">📂</span>
              <span className="text-sm">This chapter is empty.</span>
            </div>
          )}

          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => {
                if (!chapter.resources[item]) return;
                return (
                  <ResourceItem
                    key={item}
                    id={item}
                    resource={chapter.resources[item]}
                    isVideo={
                      chapter.resources[item].duration !== undefined &&
                      chapter.resources[item].duration !== null
                    }
                    chapter={chapter}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ChapterItem;
