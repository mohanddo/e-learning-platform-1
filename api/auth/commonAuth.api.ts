import { axiosInstance } from "../axios";
import {
  ChangePasswordRequest,
  LoginCredentials,
  VerifyUserRequest,
} from "@/components/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const commonAuthApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await axiosInstance.post<void>("auth/login", credentials);
    return data;
  },

  logout: async () => {
    const res = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout request failed");
    }
  },

  resendVerificationEmail: async (email: string) => {
    const { data } = await axiosInstance.post<void>(
      `auth/resend?email=${email}`
    );
    return data;
  },

  verifyEmail: async (request: VerifyUserRequest) => {
    const { data } = await axiosInstance.post<void>("auth/verify", request);
    return data;
  },

  resetPassword: async (email: string) => {
    const { data } = await axiosInstance.post<string>(
      `password/verifyEmail/${email}`
    );
    return data;
  },

  changePassword: async (changePasswordRequest: ChangePasswordRequest) => {
    const { data } = await axiosInstance.patch<void>(
      "password/changePassword",
      changePasswordRequest
    );
    return data;
  },
};
