import React, { useEffect, useRef, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "./button";
import { CourseReview } from "@/types/types";
import { getRating, getReview } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
interface ReviewModalProps {
  onClose: () => void;
  review: CourseReview | undefined;
  onAdd: (rating: string, comment: string | null) => void;
  onUpdate: (rating: string, comment: string | null, id: number) => void;
  onDelete?: () => void;
  courseId: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  onClose,
  review,
  onAdd,
  onUpdate,
  onDelete,
  courseId,
}) => {
  const [rating, setRating] = useState(review ? getRating(review.review) : 0);
  const [comment, setComment] = useState(review?.comment || "");

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const addOrUpdateReviewMutation = useMutation({
    mutationFn: async () =>
      courseApi.addOrUpdateCourseReview({
        review: rating,
        comment: comment.length > 0 ? comment : null,
        courseId: courseId,
      }),
    onSuccess: () => {
      if (isMounted.current) {
        const reviewString = getReview(rating);
        if (review) {
          onUpdate(
            reviewString,
            comment.length > 0 ? comment : null,
            review.id
          );
        } else {
          onAdd(reviewString, comment.length > 0 ? comment : null);
        }
      }
    },
    onError: () => {
      if (isMounted.current) {
        alert("Error adding or updating review");
      }
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: review?.id
      ? async () => courseApi.deleteCourseReview(courseId)
      : undefined,
    onSuccess: () => {
      if (isMounted.current) {
        onDelete?.();
      }
    },
    onError: () => {
      if (isMounted.current) {
        alert("Error deleting review");
      }
    },
  });

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl mx-4 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200 max-h-[90vh] overflow-y-auto hide-scrollbar"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg font-bold">Your review</p>
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
        {/* Rating */}
        <div className="px-6 pt-6 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              data-testid={`star-${star}`}
            >
              ★
            </span>
          ))}
        </div>
        {/* Comment */}
        <div className="px-6 py-4">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--addi-color-500)] min-h-[80px] resize-none"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            data-testid="review-comment"
          />
        </div>
        {/* Actions */}
        <div className="px-6 pb-6 flex justify-end gap-4">
          {review && (
            <Button
              variant="ghost"
              className={`text-[var(--addi-color-500)] font-bold
                  ${
                    addOrUpdateReviewMutation.isPending ||
                    deleteReviewMutation.isPending
                      ? "opacity-50"
                      : ""
                  }
                `}
              onClick={() => deleteReviewMutation.mutate()}
              disabled={
                deleteReviewMutation.isPending ||
                addOrUpdateReviewMutation.isPending
              }
              data-testid="delete-review"
            >
              {deleteReviewMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </Button>
          )}
          <Button
            className={`bg-[var(--addi-color-500)] text-white font-bold hover:bg-[var(--addi-color-400)]
                ${
                  addOrUpdateReviewMutation.isPending ||
                  deleteReviewMutation.isPending
                    ? "opacity-50"
                    : ""
                }
              `}
            onClick={() => {
              if (rating < 1) {
                alert("The rating must be at least one");
              } else {
                addOrUpdateReviewMutation.mutate();
              }
            }}
            disabled={
              addOrUpdateReviewMutation.isPending ||
              deleteReviewMutation.isPending
            }
            data-testid="submit-review"
          >
            {addOrUpdateReviewMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {review ? "Update Comment" : "Add Comment"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
