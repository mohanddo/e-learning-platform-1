import React, { useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { AnnouncementComment } from "@/types/types";
interface ReviewModalProps {
  onClose: () => void;
  onDelete: () => void;
  courseId: number;
  announcementId: number;
  comment: AnnouncementComment;
}

const DeleteAnnouncementComment: React.FC<ReviewModalProps> = ({
  onClose,
  onDelete,
  courseId,
  announcementId,
  comment,
}) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const deleteAnnouncementCommentMutation = useMutation({
    mutationFn: async () =>
      courseApi.deleteAnnouncementComment(courseId, announcementId, comment.id),

    onSuccess: () => {
      onDelete();
    },
    onError: () => {
      if (isMounted.current) {
        alert("Error deleting comment");
      }
    },
  });

  return (
    <div
      className="fixed inset-0 z-[950] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg font-bold">Delete Comment</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-all duration-200 cursor-pointer"
            aria-label="Close review modal"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-gray-600">
            Are you sure you want to delete this comment?
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
          <Button
            variant="ghost"
            className="text-[var(--addi-color-500)] font-bold"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className={`bg-[var(--addi-color-500)] text-white font-bold hover:bg-[var(--addi-color-400)]
                ${
                  deleteAnnouncementCommentMutation.isPending
                    ? "opacity-50"
                    : ""
                }
              `}
            onClick={() => {
              deleteAnnouncementCommentMutation.mutate();
            }}
            disabled={deleteAnnouncementCommentMutation.isPending}
          >
            {deleteAnnouncementCommentMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Delete Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAnnouncementComment;
