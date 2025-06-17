import React from "react";
import { Star } from "lucide-react";
import { calculateCourseTotalHours } from "@/utils";
import { Button } from "../ui/button";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ProfileImage from "@/components/ui/profile-image";
import { useCourse } from "@/context/CourseContext";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

const CoursePresentation: React.FC = () => {
  const { course } = useCourse();

  const teacher = course!.teacher;
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{course!.title}</h1>
        <p className="text-base text-gray-700 mb-4">{course!.description}</p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 text-sm items-center">
        <span className="flex items-center gap-1">
          <span className="font-bold text-yellow-500">
            {course!.rating.toFixed(1)}
          </span>
          <Star className="w-4 h-4 text-yellow-500" fill="#facc15" />
          <span>({course!.numberOfReviews} reviews)</span>
        </span>
        <span>{course!.numberOfStudents} students</span>
        <span>{calculateCourseTotalHours(course!)} hours</span>
        <span>{course!.numberOfVideos} videos</span>
        <span>{course!.numberOfDocuments} documents</span>
      </div>

      {/* Teacher Info */}
      <div className="flex items-center gap-6 bg-gray-50 p-4 rounded">
        <ProfileImage
          src={`${profilePicsEndPoint}/${teacher.id}?${teacher.sasTokenForReadingProfilePic}`}
          firstName={teacher.firstName}
          lastName={teacher.lastName}
          className="mr-2"
          size="lg"
        />
        <div>
          <div className="font-bold text-lg">
            {teacher.firstName} {teacher.lastName}
          </div>
          {teacher.description && (
            <div className="text-md text-gray-600 mb-3 mt-1">
              {teacher.description}
            </div>
          )}
          {(teacher.facebookLink ||
            teacher.youtubeLink ||
            teacher.instagramLink) && (
            <div className="flex gap-2 mt-1">
              {teacher.facebookLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={teacher.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}
              {teacher.youtubeLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={teacher.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTubeIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}
              {teacher.instagramLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
                >
                  <a
                    href={teacher.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="text-[var(--addi-color-500)]" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePresentation;
