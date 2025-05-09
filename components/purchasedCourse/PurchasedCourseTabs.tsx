import React, { useState } from "react";
import { Course } from "@/components/types";
import CourseReviews from "@/components/courseDetails/courseReviews";
import PurchasedCourseReviewsTab from "@/components/purchasedCourse/PurchasedCourseReviewsTab";

const tabList = [
  { key: "presentation", label: "Presentation" },
  { key: "qa", label: "Q & A" },
  { key: "reviews", label: "Reviews" },
  { key: "announcements", label: "Announcements" },
];

interface PurchasedCourseTabsProps {
  course: Course;
}

const PurchasedCourseTabs: React.FC<PurchasedCourseTabsProps> = ({
  course,
}) => {
  const [activeTab, setActiveTab] = useState<string>("presentation");

  return (
    <div className="w-full bg-white rounded-lg shadow-lg pb-10">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 px-4 text-center font-semibold transition-colors duration-150
              ${
                activeTab === tab.key
                  ? "border-b-2 border-[var(--addi-color-500)] text-black"
                  : "text-gray-400 hover:text-black"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-6 min-h-[200px]">
        {activeTab === "presentation" && (
          <div>Presentation content goes here.</div>
        )}
        {activeTab === "qa" && <div>Q & A content goes here.</div>}
        {activeTab === "reviews" && (
          <PurchasedCourseReviewsTab
            courseReviews={course.courseReviews}
            courseRating={course.rating}
            numberOfReviews={course.numberOfReviews}
          />
        )}
        {activeTab === "announcements" && (
          <div>Announcements content goes here.</div>
        )}
      </div>
    </div>
  );
};

export default PurchasedCourseTabs;
