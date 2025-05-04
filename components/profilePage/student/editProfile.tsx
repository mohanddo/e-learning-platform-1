"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";

export const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
          <img
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
        className="w-full bg-[var(--addi-color-400)] text-white hover:bg-[var(--addi-color-500)]"
      >
        Save Changes
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
