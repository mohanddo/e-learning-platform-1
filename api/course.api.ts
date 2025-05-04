import { axiosInstance } from "./axios";
import { Course } from "../components/types";

export const courseApi = {
  getAllCourses: async () => {
    const { data } = await axiosInstance.get<Course[]>(`course/all`);
    return data;
  },
  getStudentCourses: async () => {
    const { data } = await axiosInstance.get<Course[]>(`student/courses/all`);
    return data;
  },
  getTeacherCourses: async () => {
    const { data } = await axiosInstance.get<Course[]>(`teacher/courses/all`);
    return data;
  },
};
