"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { commonAuthApi } from "@/api/auth/commonAuth.api";
import { useMutation } from "@tanstack/react-query";
import { validatePassword } from "@/utils";
import { toast } from "react-hot-toast";
import showAlert from "../ui/AlertC";

const ChangePassword = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const isMounted = useRef(false);

  const changePasswordMutation = useMutation({
    mutationFn: commonAuthApi.changePassword,
    onSuccess: () => {
      showAlert("success", "Password changed successfully!");

      if (isMounted.current) {
        router.push("/profile");
      }
    },
    onError: () => {
      if (isMounted.current) {
        showAlert("error", "Failed to update password. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPasswordValidation = validatePassword(newPassword);
    const newPasswordValidation = validatePassword(newPassword);
    if (!currentPasswordValidation.isValid || !newPasswordValidation.isValid) {
      alert(currentPasswordValidation.message);
      return;
    }

    if (newPassword !== verifyPassword) {
      alert("New passwords do not match");
      return;
    }
    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
      repeatPassword: verifyPassword,
    });
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <section className="w-[90%] max-w-md p-5 flex flex-col gap-2.5 bg-white shadow-lg rounded-xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p className="text-gray-500 mt-2">
          Update your password to keep your account secure
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="currentPassword" className="font-medium">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--addi-color-400)]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--addi-color-400)]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="verifyPassword" className="font-medium">
            Verify New Password
          </label>
          <input
            type="password"
            id="verifyPassword"
            value={verifyPassword}
            autoComplete="new-password"
            onChange={(e) => setVerifyPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--addi-color-400)]"
            required
          />
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            className={`flex-1 border-[var(--addi-color-500)] text-[var(--addi-color-500)] hover:bg-[var(--color-100)] ${
              changePasswordMutation.isPending
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => router.push("/profile")}
            disabled={changePasswordMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[var(--addi-color-400)] text-white hover:bg-[var(--addi-color-500)]"
            disabled={changePasswordMutation.isPending}
          >
            {changePasswordMutation.isPending
              ? "Changing Password..."
              : "Change Password"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
