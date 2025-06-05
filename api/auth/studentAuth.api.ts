import { axiosInstance } from "../axios";
import { RegisterCredentials, Student } from "@/types/types";
import { UpdateStudentRequest } from "@/types/request";
import { commonAuthApi } from "./commonAuth.api";
import axios from "axios";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

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

  update: async (
    request: UpdateStudentRequest,
    studentId: number,
    sasTokenForWritingProfilePic: string,
    profilePic: File | null
  ) => {
    if (!request.hasProfilePic || profilePic == null) {
      await axiosInstance.put<void>("student/update", request);
      return;
    }

    try {
      await axios.put(
        `${profilePicsEndPoint}/${studentId}?${sasTokenForWritingProfilePic}`,
        profilePic,
        {
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": profilePic.type,
          },
        }
      );

      await axiosInstance.put<void>("student/update", request);
    } catch (error) {
      throw new Error(
        "Profile picture upload or update failed: " + String(error)
      );
    }
  },
};
