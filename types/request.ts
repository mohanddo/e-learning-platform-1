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
