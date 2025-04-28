import { axiosInstance } from './axios';    
import { CheckoutUrl } from '@/components/types';
export const cartApi = {
    addOrRemoveCourseFromCart: async (courseId: number) => {
        const { data } = await axiosInstance.put<void>(
            `course/addOrRemoveCourseFromCart/${courseId}`
        );
        return data;
    },
    purchaseCart: async () => {
        const { data } = await axiosInstance.post<CheckoutUrl>(
            `purchase/cart`
        );
        return data;
    },
};