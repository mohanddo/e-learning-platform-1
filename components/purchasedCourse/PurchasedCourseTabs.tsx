"use client";

import React, { useState } from "react";
import PurchasedCourseReviewsTab from "@/components/purchasedCourse/PurchasedCourseReviewsTab";
import CoursePresentation from "@/components/purchasedCourse/CoursePresentation";
import CourseAnnouncementsList from "@/components/purchasedCourse/CourseAnnouncement";
import CourseQAList from "@/components/purchasedCourse/CourseQAList";

const tabList = [
  { key: "presentation", label: "Presentation" },
  { key: "qa", label: "Q & A" },
  { key: "reviews", label: "Reviews" },
  { key: "announcements", label: "Announcements" },
];

type PurchasedCourseTabsProps = {
  role: "student" | "teacher";
};

const PurchasedCourseTabs: React.FC<PurchasedCourseTabsProps> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<string>("presentation");

  return (
    <div className="w-full bg-white rounded-lg shadow-lg pb-10">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 px-4 text-center font-semibold transition-colors duration-150 cursor-pointer
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
        {activeTab === "presentation" && <CoursePresentation />}
        {activeTab === "qa" && <CourseQAList role={role} />}
        {activeTab === "reviews" && <PurchasedCourseReviewsTab />}
        {activeTab === "announcements" && (
          <CourseAnnouncementsList role={role} />
        )}
      </div>
    </div>
  );
};

export default PurchasedCourseTabs;
