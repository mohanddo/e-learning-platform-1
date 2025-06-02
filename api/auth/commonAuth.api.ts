import { LoginCredentials } from "@/components/types/types";
import { axiosInstance } from "../axios";
import {
  ChangePasswordRequest,
  VerifyUserRequest,
} from "@/components/types/request";

export const commonAuthApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await axiosInstance.post<void>("auth/login", credentials);
    return data;
  },

  logout: async () => {
    await axiosInstance.post("auth/logout");
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
