import React from "react";
import { Star } from "lucide-react";
import { CourseReview } from "../../types/types";
import CourseReviewCard from "./CourseReview";
const CourseReviews = ({
  courseReviews,
  courseRating,
  numberOfReviews,
}: {
  courseReviews: CourseReview[];
  courseRating: number;
  numberOfReviews: number;
}) => {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 text-lg font-semibold mb-4">
        <Star className="fill-yellow-400 text-yellow-400" size={20} />
        <span>
          {courseRating} course rating &bull; {numberOfReviews} reviews
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseReviews
          .filter((review) => review.comment != null)
          .map((review) => (
            <CourseReviewCard key={review.id} review={review} />
          ))}
      </div>
    </div>
  );
};

export default CourseReviews;
