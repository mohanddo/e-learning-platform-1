"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../../ui/button";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/navigation";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

const PersonalData = () => {
  const { teacher } = useAppContext();
  const router = useRouter();

  const handleChangePassword = () => {
    router.push("/changePassword");
  };

  return (
    <div className="w-full">
      <p className="text-xl font-semibold mb-10">Personal Information</p>
      <div className="flex flex-row gap-5">
        <Avatar className="w-25 h-25 mr-2">
          <AvatarImage
            src={`${profilePicsEndPoint}/${teacher?.id}?${teacher?.sasTokenForReadingProfilePic}`}
          />
          <AvatarFallback className="bg-black text-white text-3xl">
            {teacher!.firstName[0]}
            {teacher!.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <p className="text-lg font-bold mb-2">
            {teacher!.firstName[0]}
            {teacher!.lastName[0]}
          </p>
          <div className="flex gap-2">
            <Button
              className="btn-secondary text-lg"
              onClick={() => {
                router.push("/teacher/profile/editProfile");
              }}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="text-lg border-[var(--addi-color-500)] text-[var(--addi-color-500)] hover:bg-[var(--color-100)]"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full px-20 py-10">
        <div className="grid grid-cols-2 gap-4 gap-x-10 justify-items-start items-start">
          <div className="flex flex-col w-full">
            <p className="font-bold mb-3">First Name</p>
            <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">
              {teacher!.firstName}
            </span>
          </div>

          <div className="flex flex-col w-full">
            <p className="font-bold mb-3">Last Name</p>
            <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">
              {teacher!.lastName}
            </span>
          </div>

          <div className="flex flex-col w-full col-span-2">
            <p className="font-bold mb-3">Email</p>
            <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">
              {teacher!.email}
            </span>
          </div>

          <div className="flex flex-col w-full">
            <p className="font-bold mb-3">Number of Students</p>
            <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">
              {teacher!.numberOfStudents}
            </span>
          </div>

          <div className="flex flex-col w-full">
            <p className="font-bold mb-3">Number of Courses</p>
            <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">
              {teacher!.numberOfCourses}
            </span>
          </div>

          <div className="flex flex-col w-full col-span-2">
            <p className="font-bold mb-3">Description</p>
            <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">
              {teacher!.description || "No description provided."}
            </span>
          </div>

          <div className="flex flex-col w-full col-span-2">
            <p className="font-bold mb-3">Social Links</p>
            <div className="flex gap-4">
              {teacher!.facebookLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={teacher!.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}

              {teacher!.instagramLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={teacher!.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}

              {teacher!.youtubeLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={teacher!.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTubeIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}

              {!(
                teacher!.facebookLink ||
                teacher!.instagramLink ||
                teacher!.youtubeLink
              ) && (
                <span className="text-gray-500">No social links provided.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
