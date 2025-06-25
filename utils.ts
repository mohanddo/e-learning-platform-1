import { JwtPayload, Course, Resource, Chapter } from "@/types/types";

import { jwtDecode } from "jwt-decode";
import { CourseReview, Comment, ReplyComment } from "@/types/types";

// utils/validations.ts
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return {
      isValid: false,
      message: "Email is required",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Please enter a valid email address",
    };
  }

  return {
    isValid: true,
    message: "Email is valid",
  };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return {
      isValid: false,
      message: "Password is required",
    };
  }

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
    };
  }

  return {
    isValid: true,
    message: "Password is valid",
  };
};

// Optional: Combined validation function
export const validateCredentials = (
  email: string,
  password: string
): ValidationResult => {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return {
    isValid: true,
    message: "Credentials are valid",
  };
};

export const extractRoleFromToken = (token: string): string => {
  const jwtPayload = jwtDecode<JwtPayload>(token);
  return jwtPayload.role;
};

export const getRelativeTimeFromNow = (inputDate: string): string => {
  const now = new Date();
  const inputDateObj = new Date(inputDate);
  const diffMs = now.getTime() - inputDateObj.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months >= 1) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks >= 1) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days >= 1) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours >= 1) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes >= 1) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
};

export function formatSecondsToMMSS(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
}

export function getRating(review: string): number {
  let rating = 0;
  switch (review) {
    case "FIVE_STARS":
      rating = 5;
      break;
    case "FOUR_STARS":
      rating = 4;
      break;
    case "THREE_STARS":
      rating = 3;
      break;
    case "TWO_STARS":
      rating = 2;
      break;
    case "ONE_STAR":
      rating = 1;
      break;
  }
  return rating;
}

export function getReview(rating: number): string {
  switch (rating) {
    case 5:
      return "FIVE_STARS";
    case 4:
      return "FOUR_STARS";
    case 3:
      return "THREE_STARS";
    case 2:
      return "TWO_STARS";
    case 1:
      return "ONE_STAR";
  }

  return "ZERO_STAR";
}

export function calculateCourseRating(courseReviews: CourseReview[]): number {
  if (!courseReviews.length) return 0;
  const total = courseReviews.reduce(
    (sum, review) => sum + getRating(review.review),
    0
  );
  return parseFloat((total / courseReviews.length).toFixed(2));
}

export function calculateCourseTotalHours(course: Course): number {
  const totalSeconds = course.chapters.reduce((sum, chapter) => {
    return (
      sum +
      chapter.videos.reduce((vSum, video) => vSum + (video.duration || 0), 0)
    );
  }, 0);
  return parseFloat((totalSeconds / 3600).toFixed(2));
}

export function validateProfilePic(file: File): boolean {
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const MAX_FILE_SIZE_MB = 2;

  if (!ALLOWED_TYPES.includes(file.type)) {
    alert("Invalid file type. Please upload JPG, PNG, or WebP.");
    return false;
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    alert(`File is too large. Max allowed size is ${MAX_FILE_SIZE_MB} MB.`);
    return false;
  }

  return true;
}

export const findChapterId = (
  resource: Resource | null,
  chapters: Chapter[] | undefined
) => {
  if (!chapters || !resource) return null;

  for (const chapter of chapters) {
    // Check in videos
    const videoFound = chapter.videos.find((video) => video.id === resource.id);
    if (videoFound) return chapter.id;

    // Check in documents
    const docFound = chapter.documents.find((doc) => doc.id === resource.id);
    if (docFound) return chapter.id;
  }
  return null;
};

export function updateCommentInCourse(
  course: Course,
  commentId: number,
  updater: (c: Comment) => void
) {
  // Deep copy chapters, resources, and comments
  return {
    ...course,
    chapters: course.chapters.map((chapter) => ({
      ...chapter,
      videos: chapter.videos.map((resource) => ({
        ...resource,
        comments: resource.comments.map((comment) =>
          comment.id === commentId
            ? (() => {
                const updated: Comment = { ...comment };
                updater(updated);
                return updated;
              })()
            : comment
        ),
      })),
      documents: chapter.documents.map((resource) => ({
        ...resource,
        comments: resource.comments.map((comment) =>
          comment.id === commentId
            ? (() => {
                const updated = { ...comment };
                updater(updated);
                return updated;
              })()
            : comment
        ),
      })),
    })),
  };
}

export function updateReplyCommentInCourse(
  course: Course,
  replyCommentId: number,
  updater: (r: ReplyComment) => void
) {
  // Deep copy chapters, resources, and comments
  return {
    ...course,
    chapters: course.chapters.map((chapter) => ({
      ...chapter,
      videos: chapter.videos.map((resource) => ({
        ...resource,
        comments: resource.comments.map((comment) => ({
          ...comment,
          replyComments: comment.replyComments.map((replyComment) =>
            replyComment.id == replyCommentId
              ? (() => {
                  const updated = { ...replyComment };
                  updater(updated);
                  return updated;
                })()
              : replyComment
          ),
        })),
      })),
      documents: chapter.documents.map((resource) => ({
        ...resource,
        comments: resource.comments.map((comment) => ({
          ...comment,
          replyComments: comment.replyComments.map((replyComment) =>
            replyComment.id == replyCommentId
              ? (() => {
                  const updated = { ...replyComment };
                  updater(updated);
                  return updated;
                })()
              : replyComment
          ),
        })),
      })),
    })),
  };
}
