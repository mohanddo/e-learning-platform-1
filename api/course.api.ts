import { axiosInstance } from "./axios";
import { Course } from "../components/types";

export const courseApi = {
  getAllCourses: async () => {
    const { data } = await axiosInstance.get<Course[]>(`course/all`);
    return data;
  },
  getCourseById: async (courseId: number) => {
    const { data } = await axiosInstance.get<Course>(`course/byId/${courseId}`);
    return data;
  },
  getStudentCourseById: async (courseId: number) => {
    const { data } = await axiosInstance.get<Course>(
      `student/course/byId/${courseId}`
    );
    return data;
  },
  getTeacherCourseById: async (courseId: number) => {
    const { data } = await axiosInstance.get<Course>(
      `teacher/course/byId/${courseId}`
    );
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
