import { useMutation } from "@tanstack/react-query";
import { favoriteApi } from "@/api/favorite.api";

export function useRemoveFromFavoritesMutation({
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
      const data = await favoriteApi.removeCourseFromFavorites(courseId);
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
