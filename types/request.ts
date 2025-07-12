import { CourseCategory, PricingModel } from "./types";

export interface UpdateStudentRequest {
  firstName: string;
  lastName: string;
  hasProfilePic: boolean;
}

export interface UpdateTeacherRequest {
  firstName: string;
  lastName: string;
  hasProfilePic: boolean;
  description?: string | null;
  facebookLink?: string | null;
  instagramLink?: string | null;
  youtubeLink?: string | null;
}

export interface VerifyUserRequest {
  email: string;
  verificationCode: string;
}

export interface ChangePasswordRequest {
  newPassword: string;
  currentPassword: string;
  repeatPassword: string;
}

export interface AddOrUpdateCourseReviewRequest {
  review: number;
  comment: string | null;
  courseId: number;
}

export interface CreateOrUpdateAnnouncementComment {
  comment: string;
  commentId: number | null;
  announcementId: number;
  courseId: number;
}

export interface CreateOrUpdateComment {
  text: string;
  commentId: number | null;
  resourceId: number;
  chapterId: number;
  courseId: number;
}

export interface UpVoteComment {
  commentId: number;
  resourceId: number;
  chapterId: number;
  courseId: number;
}

export interface CreateOrUpdateReplyComment {
  text: string;
  commentId: number;
  replyCommentId: number | null;
  resourceId: number;
  chapterId: number;
  courseId: number;
}

export interface UpVoteReplyComment {
  commentId: number;
  replyCommentId: number;
  resourceId: number;
  chapterId: number;
  courseId: number;
}

export interface UpdateVideoProgressRequest {
  progress: number;
  courseId: number;
  chapterId: number;
  videoId: number;
}

export interface UpdateActiveResourceRequest {
  courseId: number;
  chapterId: number;
  resourceId: number;
}

export interface CreateOrUpdateAnnouncement {
  courseId: number;
  text: string;
  announcementId: number | null;
}

export interface UpdateCourseRequest {
  courseId: number;
  title: string;
  description: string;
  category: CourseCategory;
  price: number;
  discountPercentage: number;
  discountExpirationDate: string | null; // ISO date string
  imageUrl?: string | null;
  introductionVideoUrl?: string | null;
}

export interface AddOrUpdateChapterRequest {
  title: string;
  courseId: number;
  chapterId: number | null;
}

export interface ReorderChaptersRequest {
  orderedChapterIds: number[];
  courseId: number;
}

export interface ReorderResourcesRequest {
  orderedResourceIds: number[];
  chapterId: number;
  courseId: number;
}

export interface AddVideoRequest {
  title: string;
  duration: number;
  isFree: boolean;
  downloadUrl: string;
  courseId: number;
  chapterId: number;
}

export interface AddDocumentRequest {
  title: string;
  isFree: boolean;
  downloadUrl: string;
  courseId: number;
  chapterId: number;
}

export interface UpdateVideoRequest {
  title: string;
  isFree: boolean;
  duration: number;
  courseId: number;
  chapterId: number;
  videoId: number;
}

export interface UpdateDocumentRequest {
  title: string;
  isFree: boolean;
  courseId: number;
  chapterId: number;
  documentId: number;
}

export interface UpdateResourceRequest {
  title: string;
  isFree: boolean;
  duration: number | null;
  courseId: number;
  chapterId: number;
  resourceId: number;
}

// CreateCourseRequest interface (converted from Java)
export interface CreateCourseRequest {
  title: string;
  description: string;
  pricingModel: PricingModel;
  category: CourseCategory;
  price: number;
  imageUrl?: string | null;
  introductionVideoUrl?: string | null;
}
