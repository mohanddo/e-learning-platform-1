import { useMutation } from "@tanstack/react-query";
import { favoriteApi } from "@/api/favorite.api";

export function useAddToFavoritesMutation({
  courseId,
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
  courseId: number;
}) {
  return useMutation({
    mutationFn: async () => {
      const data = await favoriteApi.addCourseToFavorites(courseId);
      return data;
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });
}
