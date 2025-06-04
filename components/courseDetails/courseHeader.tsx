import React from "react";
import { Star, Clock, Globe, Subtitles } from "lucide-react";
import { Course } from "../../types/types";

const CourseHeader = ({ course }: { course: Course }) => {
  return (
    <div className="w-full mb-8 bg-gray-800 p-6 text-white">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center text-yellow-400">
          {[1, 2, 3, 4, 5].map((i) => {
            return (
              <Star
                key={i}
                size={20}
                fill={i <= course.rating ? "yellow" : "none"}
                className={
                  i <= course.rating ? "text-yellow-400" : "text-gray-300"
                }
              />
            );
          })}
        </div>
        <span className="text-gray-300">
          ({course.numberOfReviews}{" "}
          {course.numberOfReviews > 1 ? "ratings" : "rating"})
        </span>
        <span className="text-gray-300">
          {course.numberOfStudents}{" "}
          {course.numberOfStudents > 1 ? "students" : "student"}
        </span>
      </div>
      <div className="flex items-center gap-6 text-gray-400">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>Last updated: 11/2022</span>
        </div>
        <div className="flex items-center gap-1">
          <Globe size={16} />
          <span>French</span>
        </div>
        <div className="flex items-center gap-1">
          <Subtitles size={16} />
          <span>French [Auto]</span>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
