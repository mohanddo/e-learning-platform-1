import React from "react";
import { Course } from "@/types/types";
import { Star } from "lucide-react";
import { calculateCourseTotalHours } from "@/utils";
import { Button } from "../ui/button";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

interface CoursePresentationProps {
  course: Course;
}

const CoursePresentation: React.FC<CoursePresentationProps> = ({ course }) => {
  const teacher = course.teacher;
  return (
    <div className="space-y-8">
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
        <p className="text-base text-gray-700 mb-4">{course.description}</p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 text-sm items-center">
        <span className="flex items-center gap-1">
          <span className="font-bold text-yellow-500">
            {course.rating.toFixed(1)}
          </span>
          <Star className="w-4 h-4 text-yellow-500" fill="#facc15" />
          <span>({course.numberOfReviews} reviews)</span>
        </span>
        <span>{course.numberOfStudents} students</span>
        <span>{calculateCourseTotalHours(course)} hours</span>
        <span>{course.numberOfVideos} videos</span>
        <span>{course.numberOfDocuments} documents</span>
      </div>

      {/* Teacher Info */}
      <div className="flex items-center gap-6 bg-gray-50 p-4 rounded">
        <Avatar className="w-15 h-15 mr-2">
          <AvatarImage
            src={`${profilePicsEndPoint}/${teacher.id}?${teacher.sasTokenForReadingProfilePic}`}
          />
          <AvatarFallback className="bg-black text-white text-2xl">
            {teacher.firstName[0]}
            {teacher.lastName[0]}
          </AvatarFallback>
        </Avatar>
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
