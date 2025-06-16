import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { CreateOrUpdateReplyComment } from "@/types/request";

export function useCreateOrUpdateReplyCommentMutation({
  createOrUpdateReplyCommentRequest,
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
  createOrUpdateReplyCommentRequest: CreateOrUpdateReplyComment;
}) {
  return useMutation({
    mutationFn: async () => {
      await courseApi.postReplyComment(createOrUpdateReplyCommentRequest);
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });
}
