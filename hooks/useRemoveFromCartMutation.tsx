import { useMutation } from "@tanstack/react-query";
import { cartApi } from "@/api/cart.api";

export function useRemoveFromCartMutation({
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
      const data = await cartApi.removeCourseFromCart(courseId);
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
