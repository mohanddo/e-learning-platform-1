import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    initials: "PB",
    name: "Pierre Jean B.",
    rating: 5,
    date: "1 week ago",
    text: "The instructor explained concepts clearly with practical examples that really helped me understand programming better.",
  },
  {
    id: 2,
    initials: "MA",
    name: "Mahmoudou Abdoul N.",
    rating: 5,
    date: "3 months ago",
    text: "This course is detailed and projects allow you to apply skills learned in various sections. Highly recommend!",
  },
  {
    id: 3,
    initials: "MA",
    name: "Mahmoudou Abdoul N.",
    rating: 5,
    date: "3 months ago",
    text: "This course is detailed and projects allow you to apply skills learned in various sections. Highly recommend!",
  },
  {
    id: 4,
    initials: "MA",
    name: "Mahmoudou Abdoul N.",
    rating: 5,
    date: "3 months ago",
    text: "This course is detailed and projects allow you to apply skills learned in various sections. Highly recommend!",
  },
];

const CourseReviews = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 text-lg font-semibold mb-4">
        <Star className="text-yellow-400" size={20} />
        <span>4.6 course rating &bull; 4K reviews</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id}>
            <hr className="w-full border-gray-300 mb-4" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                {review.initials}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" size={16} />
                  ))}
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-sm text-gray-700">{review.name}</p>
                <p className="mt-1 text-gray-600 text-sm">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviews;
