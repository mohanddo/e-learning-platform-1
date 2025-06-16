import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { CreateOrUpdateComment } from "@/types/request";

export function useCreateOrUpdateCommentMutation({
  createOrUpdateCommentRequest,
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
  createOrUpdateCommentRequest: CreateOrUpdateComment;
}) {
  return useMutation({
    mutationFn: async () => {
      await courseApi.postComment(createOrUpdateCommentRequest);
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });
}
