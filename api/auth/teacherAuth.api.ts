import { axiosInstance } from "../axios";
import { RegisterCredentials } from "@/components/types/types";
import { commonAuthApi } from "./commonAuth.api";
import { Teacher } from "@/components/types/types";

export const authApi = {
  ...commonAuthApi,

  register: async (credentials: RegisterCredentials) => {
    const { data } = await axiosInstance.post<void>(
      "auth/teacher/signup",
      credentials
    );
    return data;
  },

  me: async () => {
    const { data } = await axiosInstance.get<Teacher>("teacher/me");
    return data;
  },
};
