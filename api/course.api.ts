import { axiosInstance } from "./axios";
import { Course } from "../types/types";
import {
  AddOrUpdateCourseReviewRequest,
  CreateOrUpdateAnnouncementComment,
  CreateOrUpdateComment,
  CreateOrUpdateReplyComment,
  UpVoteComment,
  UpVoteReplyComment,
} from "@/types/request";

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

  addOrUpdateCourseReview: async (review: AddOrUpdateCourseReviewRequest) => {
    await axiosInstance.put<void>(`course/courseReview/createOrUpdate`, review);
  },

  deleteCourseReview: async (reviewId: number) => {
    await axiosInstance.delete<void>(`course/courseReview/delete/${reviewId}`);
  },

  addFinishedResource: async (
    courseId: number,
    chapterId: number,
    resourceId: number
  ) => {
    await axiosInstance.post<void>(
      `resource/addFinishedResource/${courseId}/${chapterId}/${resourceId}`
    );
  },

  deleteFinishedResource: async (resourceId: number) => {
    await axiosInstance.delete<void>(
      `resource/deleteFinishedResource/${resourceId}`
    );
  },

  postAnnouncementComment: async (
    createOrUpdateAnnouncementComment: CreateOrUpdateAnnouncementComment
  ) => {
    await axiosInstance.put<void>(
      `course/announcementComment/createOrUpdate`,
      createOrUpdateAnnouncementComment
    );
  },

  deleteAnnouncementComment: async (
    courseId: number,
    announcementId: number,
    commentId: number
  ) => {
    await axiosInstance.delete<void>(
      `course/announcementComment/delete/${commentId}/${announcementId}/${courseId}`
    );
  },

  postComment: async (createOrUpdateComment: CreateOrUpdateComment) => {
    await axiosInstance.put<void>(`comment/addOrUpdate`, createOrUpdateComment);
  },

  upVoteComment: async (upVoteComment: UpVoteComment) => {
    await axiosInstance.put<void>(`comment/upVote`, upVoteComment);
  },

  removeUpVoteComment: async (commentId: number) => {
    await axiosInstance.delete<void>(`comment/removeUpVote/${commentId}`);
  },

  postReplyComment: async (
    createOrUpdateReplyComment: CreateOrUpdateReplyComment
  ) => {
    await axiosInstance.put<void>(
      `replyComment/addOrUpdate`,
      createOrUpdateReplyComment
    );
  },

  upVoteReplyComment: async (upVoteReplyComment: UpVoteReplyComment) => {
    await axiosInstance.put<void>(`replyComment/upVote`, upVoteReplyComment);
  },

  removeUpVoteReplyComment: async (replyCommentId: number) => {
    await axiosInstance.delete<void>(
      `replyComment/removeUpVote/${replyCommentId}`
    );
  },

  deleteComment: async (commentId: number) => {
    await axiosInstance.delete<void>(`comment/delete/${commentId}`);
  },

  deleteReplyComment: async (replyCommentId: number) => {
    await axiosInstance.delete<void>(`replyComment/delete/${replyCommentId}`);
  },
};
