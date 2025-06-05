"use client";

import { EditProfile } from "@/components/profilePage/student/editProfile";
import { authApi } from "@/api/auth/studentAuth.api";
import { useAppContext } from "@/context/context";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/profilePage/LoadingState";
import { ErrorState } from "@/components/profilePage/ErrorState";

export default function EditProfilePage() {
  const { student, setStudent } = useAppContext();
  const { status, refetch } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const data = await authApi.me();
      setStudent(data);
      return data;
    },
  });

  if (status === "pending") {
    return <LoadingState />;
  }

  if (status === "error") {
    return <ErrorState refetch={refetch} />;
  }

  return <EditProfile student={student!} />;
}
