export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasProfilePic: boolean;
  sasTokenForReadingProfilePic: string;
  sasTokenForWritingProfilePic: string;
}

export interface Student extends User {
  courses: Course[];
}

export interface Teacher extends User {
  numberOfStudents: number;
  numberOfCourses: number;
  facebookLink: string | null;
  youtubeLink: string | null;
  instagramLink: string | null;
  description: string | null;
  sasToken: string;
  baseUrl: string;
  courses: Course[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export enum PricingModel {
  SUBSCRIPTION,
  ONE_TIME_PURCHASE,
  FREE,
}

export enum CourseCategory {
  MATH,
  SCIENCE,
  HISTORY,
  LANGUAGE,
  PHYSICS,
}

export interface JwtPayload {
  role: string;
}

export interface CourseReview {
  id: number;
  review: string;
  comment: string | null;
  dateOfCreation: string;
  student: StudentPreview;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  introductionVideoUrl: string | null;
  numberOfStudents: number;
  numberOfReviews: number;
  price: number;
  discountPercentage: number | null;
  discountExpirationDate: string | null;
  pricingModel: PricingModel;
  category: CourseCategory;
  rating: number;
  teacher: TeacherPreview;
  courseReviews: CourseReview[];
  chapters: Chapter[];
  favourite: boolean | null;
  enrolled: boolean | null;
  inCart: boolean | null;
  progressPercentage: number | null;
  announcements: Announcement[];
  numberOfVideos: number;
  numberOfDocuments: number;
  ownsCourse: boolean;
}

export interface ReplyComment {
  id: number;
  text: string;
  dateOfCreation: string;
  user: UserPreview;
  upVotes: number;
  hasCurrentUserUpVotedThisReplyComment: boolean;
  userOwnsThisReplyComment: boolean;
}

export interface Comment {
  id: number;
  text: string;
  dateOfCreation: string;
  user: UserPreview;
  upVotes: number;
  hasCurrentUserUpVotedThisComment: boolean;
  replyComments: ReplyComment[];
  userOwnsThisComment: boolean;
}

export type CheckoutUrl = string;

export interface Announcement {
  id: number;
  text: string;
  dateOfCreation: string; // ISO 8601 datetime string
  announcementComments: AnnouncementComment[];
}

export interface AnnouncementComment {
  id: number;
  text: string;
  dateOfCreation: string;
  user: UserPreview;
}

export interface Chapter {
  id: number;
  title: string;
  dateOfCreation: string; // ISO 8601 datetime string
  videos: Video[];
  documents: Document[];
}

export interface Resource {
  id: number;
  title: string;
  downloadUrl: string;
  dateOfCreation: string;
  isFinished: boolean;
  free: boolean;
  comments: Comment[];
}

export interface Video extends Resource {
  duration: number;
}

export type Document = Resource;

export interface UserPreview {
  id: number;
  firstName: string;
  lastName: string;
  hasProfilePic: boolean;
  sasTokenForReadingProfilePic: string;
}

export type StudentPreview = UserPreview;

export interface TeacherPreview extends UserPreview {
  numberOfStudents: number;
  numberOfCourses: number;
  facebookLink: string | null;
  youtubeLink: string | null;
  instagramLink: string | null;
  description: string | null;
}
