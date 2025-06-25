"use client";

import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../ui/button";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth/studentAuth.api";
import { UpdateStudentRequest } from "@/types/request";
import { validateProfilePic } from "@/utils";
import { Student } from "@/types/types";
import showAlert from "@/components/ui/AlertC";

export const EditProfile = ({ student }: { student: Student }) => {
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePic(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const isMounted = useRef<boolean>(null);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const updateProfileMutation = useMutation({
    mutationFn: async (updateStudentRequest: UpdateStudentRequest) => {
      await authApi.update(
        updateStudentRequest,
        student.id,
        student.sasTokenForWritingProfilePic,
        profilePic
      );
    },
    onSuccess: () => {
      showAlert("success", "Your profile has been updated successfully.");
      if (isMounted.current) {
        router.replace("/profile");
      }
    },
    onError: () => {
      showAlert("error", "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (firstName.length < 1 || lastName.length < 1) {
      alert("First name and Last name must not be empty");
    }

    if (profilePic == null) {
      updateProfileMutation.mutate({
        firstName: firstName,
        lastName: lastName,
        hasProfilePic: false,
      });
      return;
    }

    if (validateProfilePic(profilePic)) {
      updateProfileMutation.mutate({
        firstName: firstName,
        lastName: lastName,
        hasProfilePic: true,
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow p-6 rounded mt-30"
    >
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 font-medium mb-2"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 font-medium mb-2"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="profilePic"
          className="block text-gray-700 font-medium mb-2"
        >
          Profile Picture
        </label>
        {preview && (
          <Image
            width={20}
            height={20}
            src={preview}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full mb-2 object-cover"
          />
        )}
        <input
          id="profilePic"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block"
        />
      </div>
      <Button
        type="submit"
        disabled={updateProfileMutation.isPending}
        className="w-full bg-[var(--addi-color-400)] text-white hover:bg-[var(--addi-color-500)] flex items-center justify-center gap-2"
      >
        {updateProfileMutation.isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full mt-2 border-[var(--addi-color-500)] text-[var(--addi-color-500)] hover:bg-[var(--color-100)]"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </form>
  );
};
