import { axiosInstance } from "../axios";
import { RegisterCredentials, Student } from "@/components/types";
import { commonAuthApi } from "./commonAuth.api";

export const authApi = {
  ...commonAuthApi,

  register: async (credentials: RegisterCredentials) => {
    const { data } = await axiosInstance.post<void>(
      "auth/student/signup",
      credentials
    );
    return data;
  },

  me: async () => {
    const { data } = await axiosInstance.get<Student>("student/me");
    return data;
  },
};
