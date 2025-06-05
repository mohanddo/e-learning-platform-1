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
