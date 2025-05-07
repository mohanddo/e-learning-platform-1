import React from "react";
import { Star } from "lucide-react";
import { CourseReview } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRelativeTimeFromNow } from "@/utils/validations";
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
        {courseReviews.map((review) => (
          <div key={review.id}>
            <hr className="w-full border-gray-300 mb-4" />
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">
                    {review.student.firstName} {review.student.lastName}
                  </p>

                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => {
                      let rating = 0;
                      switch (review.review) {
                        case "FIVE_STARS":
                          rating = 5;
                          break;
                        case "FOUR_STARS":
                          rating = 4;
                          break;
                        case "THREE_STARS":
                          rating = 3;
                          break;
                        case "TWO_STARS":
                          rating = 2;
                          break;
                        case "ONE_STAR":
                          rating = 1;
                          break;
                      }
                      return (
                        <Star
                          key={i}
                          size={12}
                          fill={i <= rating ? "yellow" : "none"}
                          className={
                            i <= rating ? "text-yellow-400" : "text-gray-300"
                          }
                        />
                      );
                    })}
                    <span className="ml-1 text-sm text-gray-500">
                      {getRelativeTimeFromNow(review.dateOfCreation)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-1 text-gray-600 text-md">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviews;
