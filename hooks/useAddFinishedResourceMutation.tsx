import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";

export function useAddFinishedResourceMutation({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}) {
  return useMutation({
    mutationFn: async ({
      courseId,
      chapterId,
      resourceId,
    }: {
      courseId: number;
      chapterId: number;
      resourceId: number;
    }) => {
      return await courseApi.addFinishedResource(
        courseId,
        chapterId,
        resourceId
      );
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });
}
