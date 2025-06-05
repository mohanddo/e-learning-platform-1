import { axiosInstance } from "../axios";
import { RegisterCredentials } from "@/types/types";
import { commonAuthApi } from "./commonAuth.api";
import { Teacher } from "@/types/types";
import axios from "axios";
import { UpdateTeacherRequest } from "@/types/request";

const azureStorageEndpoint = process.env.NEXT_PUBLIC_AZURE_STORAGE_ENDPOINT;

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

  update: async (
    request: UpdateTeacherRequest,
    teacherId: number,
    sasTokenForWritingProfilePic: string,
    profilePic: File | null
  ) => {
    if (!request.hasProfilePic || profilePic == null) {
      await axiosInstance.put<void>("teacher/update", request);
      return;
    }

    try {
      await axios.put(
        `${azureStorageEndpoint}/profilepics/${teacherId}?${sasTokenForWritingProfilePic}`,
        profilePic,
        {
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": profilePic.type,
          },
        }
      );

      await axiosInstance.put<void>("teacher/update", request);
    } catch (error) {
      throw new Error(
        "Profile picture upload or update failed: " + String(error)
      );
    }
  },
};
