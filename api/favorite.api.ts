import { axiosInstance } from "./axios";
export const favoriteApi = {
  removeCourseFromFavorites: async (courseId: number) => {
    const { data } = await axiosInstance.delete<void>(
      `course/removeCourseFromFavorite/${courseId}`
    );
    return data;
  },

  addCourseToFavorites: async (courseId: number) => {
    const { data } = await axiosInstance.post<void>(
      `course/addCourseToFavorite/${courseId}`
    );
    return data;
  },
};
