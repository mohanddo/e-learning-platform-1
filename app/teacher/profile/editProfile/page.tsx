"use client";

import { EditProfile } from "@/components/profilePage/teacher/editProfile";
import { authApi } from "@/api/auth/teacherAuth.api";
import { useAppContext } from "@/context/context";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/profilePage/LoadingState";
import { ErrorState } from "@/components/profilePage/ErrorState";

export default function EditProfilePage() {
  const { teacher, setTeacher } = useAppContext();
  const { status, refetch } = useQuery({
    queryKey: ["teacher"],
    queryFn: async () => {
      const data = await authApi.me();
      setTeacher(data);
      return data;
    },
  });

  if (status === "pending") {
    return <LoadingState />;
  }

  if (status === "error") {
    return <ErrorState refetch={refetch} />;
  }

  return <EditProfile teacher={teacher!} />;
}
