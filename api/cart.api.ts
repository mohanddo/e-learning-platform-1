import { axiosInstance } from "./axios";
import { CheckoutUrl } from "@/components/types";
export const cartApi = {
  removeCourseFromCart: async (courseId: number) => {
    const { data } = await axiosInstance.delete<void>(
      `course/removeCourseFromCart/${courseId}`
    );
    return data;
  },

  addCourseToCart: async (courseId: number) => {
    const { data } = await axiosInstance.post<void>(
      `course/addCourseToCart/${courseId}`
    );
    return data;
  },

  purchaseCart: async () => {
    const { data } = await axiosInstance.post<CheckoutUrl>(`purchase/cart`);
    return data;
  },
};
