"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";

interface HomePageCoursesErrorProps {
  refetch: () => void;
}

const HomePageCoursesError: React.FC<HomePageCoursesErrorProps> = ({
  refetch,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-16 mb-16 px-4 sm:px-6 lg:px-8">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops, something went wrong!
      </h2>
      <p className="text-center text-gray-600 mb-6">
        We couldn&apos;t load the courses right now. Please try again.
      </p>
      <Button
        variant="default"
        size="lg"
        className="bg-red-500 text-white hover:bg-red-600"
        onClick={refetch}
      >
        Retry
      </Button>
    </div>
  );
};

export default HomePageCoursesError;
