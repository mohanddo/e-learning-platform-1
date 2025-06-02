export interface UpdateStudentRequest {
  firstName: string | null;
  lastName: string | null;
  profilePicDownloadUrl: string | null;
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
