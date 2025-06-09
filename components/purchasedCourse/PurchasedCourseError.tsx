import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PurchasedCourseErrorProps {
  onRetry?: () => void;
}

export default function PurchasedCourseError({
  onRetry,
}: PurchasedCourseErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4 p-8">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Something went wrong
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          We couldn&apos;t load the course content. This might be due to a
          network error or the course might not be available.
        </p>
        {onRetry && (
          <Button onClick={onRetry} className="mt-4" variant="default">
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}
