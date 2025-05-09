import React from "react";
import { CourseReview } from "@/components/types";
import CourseReviewCard from "@/components/courseDetails/CourseReview";
import { Star } from "lucide-react";

interface PurchasedCourseReviewsTabProps {
  courseReviews: CourseReview[];
  courseRating: number;
  numberOfReviews: number;
}

const starLabels = [
  { value: 5, label: "FIVE_STARS" },
  { value: 4, label: "FOUR_STARS" },
  { value: 3, label: "THREE_STARS" },
  { value: 2, label: "TWO_STARS" },
  { value: 1, label: "ONE_STAR" },
];

const getStarCount = (reviews: CourseReview[], label: string) =>
  reviews.filter((r) => r.review === label).length;

const PurchasedCourseReviewsTab: React.FC<PurchasedCourseReviewsTabProps> = ({
  courseReviews,
  courseRating,
}) => {
  // Calculate star breakdown
  const starCounts = starLabels.map(({ label }) =>
    getStarCount(courseReviews, label)
  );
  const total = courseReviews.length || 1;
  const starPercentages = starCounts.map((count) =>
    Math.round((count / total) * 100)
  );

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Participants&apos; comments
        </h2>
        <div className="flex flex-row items-center gap-8">
          {/* Left: Average rating */}
          <div className="flex flex-col items-center min-w-[100px]">
            <span className="text-6xl font-bold text-orange-500 leading-none">
              {courseRating.toFixed(1)}
            </span>
            <div className="flex items-center mt-1 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={22}
                  className={
                    i <= Math.round(courseRating)
                      ? "text-orange-500"
                      : "text-gray-300"
                  }
                  fill={i <= Math.round(courseRating) ? "#f59e42" : "none"}
                />
              ))}
            </div>
            <span className="text-sm text-orange-500 font-bold mt-1">
              Course Rating
            </span>
          </div>
          {/* Right: Star breakdown */}
          <div className="flex-1 flex flex-col gap-2">
            {starLabels.map((star, idx) => (
              <div key={star.value} className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-gray-200 rounded">
                  <div
                    className="h-3 bg-[var(--addi-color-500)] rounded"
                    style={{ width: `${starPercentages[idx]}%` }}
                  ></div>
                </div>
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < star.value ? "text-orange-500" : "text-gray-300"
                      }
                      fill={i < star.value ? "#f59e42" : "none"}
                    />
                  ))}
                </div>
                <span
                  className="ml-2 font-semibold min-w-[40px]"
                  style={{ color: "var(--addi-color-500)" }}
                >
                  {starPercentages[idx]} %
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Reviews list */}
      <h3 className="text-xl font-bold mb-4 mt-8">Reviews</h3>
      <div className="space-y-6">
        {courseReviews.map((review) => (
          <CourseReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default PurchasedCourseReviewsTab;
