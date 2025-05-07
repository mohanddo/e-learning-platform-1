import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const CourseDetailsError = ({ refetch }: { refetch: () => void }) => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 mt-10">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t load the course details. This might be due to a
          temporary issue or the course might not exist.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={refetch}
            className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-[var(--addi-color-500)] text-[var(--addi-color-500)] hover:bg-[var(--color-100)]"
          >
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsError;
