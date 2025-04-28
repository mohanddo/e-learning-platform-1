export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePicDownloadUrl: string | null
}

export interface Student extends User {
    courses: CoursePreview[];
}

export interface Teacher extends User {
    numberOfStudents: number;
    numberOfCourses: number;
    facebookLink: string | null,
    youtubeLink: string | null,
    instagramLink: string | null,
    description: string | null,
    sasToken: string;
    baseUrl: string;
}

export interface  LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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

export enum PricingModel {
    SUBSCRIPTION,
    ONE_TIME_PURCHASE,
    FREE
}

export enum CourseCategory {
    MATH,
    SCIENCE,
    HISTORY,
    LANGUAGE,
    PHYSICS
}

export interface CourseReview {
    id: number;
    review: number;
    comment: string;
    dateOfCreation: string;
}

export interface CoursePreview {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  introductionVideoUrl: string | null;
  numberOfStudents: number;
  numberOfReviews: number;
  price: number;
  numberOfHours: number;
  discountPercentage: number | null;
  discountExpirationDate: string | null;
  pricingModel: PricingModel;
  category: CourseCategory;
  rating: number;
  teacher: Teacher;
  courseReviews: CourseReview[];
  favourite: boolean | null;
  enrolled: boolean | null;
  inCart: boolean | null;
  progressPercentage: number | null;
}

export type CheckoutUrl = string;