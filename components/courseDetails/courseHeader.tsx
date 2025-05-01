import React from "react";
import { Star, Clock, Globe, Subtitles } from "lucide-react";

const CourseHeader = () => {
  return (
    <div className="w-full mb-8 bg-gray-800 p-6 rounded-lg text-white">
      <h1 className="text-4xl font-bold mb-4">
        JavaScript: The Ultimate Course
      </h1>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} />
          ))}
        </div>
        <span className="text-gray-300">(4,276 ratings)</span>
        <span className="text-gray-300">14,192 students</span>
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
