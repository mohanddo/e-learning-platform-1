import { JwtPayload } from "@/components/types";

import { jwtDecode } from "jwt-decode";

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
