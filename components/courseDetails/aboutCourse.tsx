"use client";

import { CheckCircle, Video } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProfileImage from "@/components/ui/profile-image";
import CourseReviews from "./courseReviews";
import { Course } from "../../types/types";
import { formatSecondsToMMSS } from "@/utils";

interface AboutCourseProps {
  course: Course;
}

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

const AboutCourse = ({ course }: AboutCourseProps) => {
  const learnings: string[] = [
    "Basic communication in English in everyday situations.",
    "You will develop excellent understanding and listening skills for this level.",
    "You will learn more than 1000 common words and phrases.",
    "You will develop excellent understanding and listening skills for this level.",
  ];
  const requirements: string[] = [
    "Basic knowledge of English.",
    "Access to a computer or smartphone with an internet connection.",
    "Willingness to practice speaking and listening regularly.",
    "No prior experience needed, just motivation to learn!",
  ];

  return (
    <div className="flex flex-col flex-4 pb-20 pr-10 box-border">
      <div className="mb-3">
        <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
          This course is presented by
        </p>
        <div className="flex flex-row mb-3 py-1 px-2 items-center rounded-xl hover:bg-gray-200 cursor-alias w-[100%]">
          <ProfileImage
            src={`${profilePicsEndPoint}/${course.teacher.id}?${course.teacher.sasTokenForReadingProfilePic}`}
            firstName={course.teacher.firstName}
            lastName={course.teacher.lastName}
            className="mr-2"
          />
          <p className="text-lg font-semibold">
            {course.teacher.firstName} {course.teacher.lastName}
          </p>
        </div>
        <p className="text-sm text-gray-400 w-full">
          {course.teacher.description}
        </p>
      </div>

      <div className="mb-3">
        <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
          About this course
        </p>
        <p className="text-sm text-gray-400 w-full">{course.description}</p>
      </div>
      <div className="mb-3">
        <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
          What you will learn
        </p>
        <div className="w-full">
          {learnings.map((chapter, index) => (
            <div key={index} className="flex items-start gap-2 w-full mb-1">
              <CheckCircle className="text-[var(--wr-color-9)] w-5 h-5" />
              <p className="text-sm text-gray-400 ">{chapter}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-10">
        <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
          Requirements
        </p>
        <div>
          {requirements.map((chapter, index) => (
            <div key={index} className="flex items-start gap-2 mb-1">
              <CheckCircle className="text-[var(--wr-color-9)] w-5 h-5" />
              <p className="text-sm text-gray-400 ">{chapter}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-10 border-t border-gray-300 w-full">
        <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
          Curriculum
        </p>
        <div className="flex flex-col justify-center">
          {course.chapters.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center text-gray-400 py-8">
              <span className="text-2xl mb-2">📄</span>
              <span className="text-base">No curriculum available yet.</span>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-[90%]">
              {course.chapters.map((chapter) => (
                <AccordionItem
                  key={chapter.id}
                  value={chapter.id.toString()}
                  className="border-none shadow-md mb-3 rounded-lg"
                >
                  <AccordionTrigger className="py-4 px-5 text-lg font-bold data-[state=open]:bg-[var(--color-100)] cursor-pointer">
                    {chapter.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-400 w-full px-5 py-5">
                    {chapter.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between gap-2 mt-2 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <Video
                            className="text-[var(--addi-color-500)]"
                            size={20}
                          />
                          <p className="text-md text-gray-400">
                            {resource.title}
                          </p>
                          {resource.free && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                              Free
                            </span>
                          )}
                        </div>
                        {resource.duration !== null && (
                          <p className="text-sm text-gray-400">
                            {formatSecondsToMMSS(resource.duration!)}
                          </p>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>

      {course.courseReviews.filter((review) => review.comment != null).length >
        0 && (
        <CourseReviews
          courseReviews={course.courseReviews}
          courseRating={course.rating}
          numberOfReviews={course.numberOfReviews}
        />
      )}
    </div>
  );
};

export default AboutCourse;
