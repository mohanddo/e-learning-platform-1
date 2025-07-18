import { axiosInstance } from "./axios";
import { CheckoutUrl } from "@/types/types";
export const paymentApi = {
  purchaseCourse: async (courseId: number) => {
    const { data } = await axiosInstance.post<CheckoutUrl>(
      `purchase/course/${courseId}`
    );
    return data;
  },
};
