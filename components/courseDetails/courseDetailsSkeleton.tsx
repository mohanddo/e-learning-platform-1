import { Skeleton } from "@/components/ui/skeleton";

const CourseDetailsSkeleton = () => {
  return (
    <section className="flex flex-col pt-[15vh]">
      {/* Course Header Skeleton */}
      <div className="w-full mb-8 bg-gray-800 p-6">
        <Skeleton className="h-12 w-3/4 mb-4 bg-gray-700" />
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-5 w-5 rounded-full bg-gray-700" />
            ))}
          </div>
          <Skeleton className="h-4 w-24 bg-gray-700" />
          <Skeleton className="h-4 w-32 bg-gray-700" />
        </div>
        <div className="flex items-center gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded-full bg-gray-700" />
              <Skeleton className="h-4 w-32 bg-gray-700" />
            </div>
          ))}
        </div>
      </div>

      <section className="flex justify-center">
        <div className="w-[85%] flex flex-row">
          {/* About Course Skeleton */}
          <div className="flex flex-col flex-4 pb-20 pr-10 box-border">
            {/* Teacher Info */}
            <div className="mb-3">
              <Skeleton className="h-6 w-48 mb-3" />
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Course Description */}
            <div className="mb-3">
              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* What you will learn */}
            <div className="mb-3">
              <Skeleton className="h-6 w-48 mb-3" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>

            {/* Requirements */}
            <div className="mb-10">
              <Skeleton className="h-6 w-40 mb-3" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>

            {/* Curriculum */}
            <div className="pt-10 border-t border-gray-300">
              <Skeleton className="h-6 w-32 mb-3" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-3">
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Join Course Skeleton */}
          <div className="flex-2 flex-col flex pb-28 pl-28 items-center sticky top-20 self-start w-full max-w-xl mx-auto">
            <div className="flex flex-col justify-center shadow-lg mb-5">
              <Skeleton className="h-72 w-full rounded-t-xl" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-12 w-full mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 w-12" />
                </div>
                <div className="space-y-2 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
                <div className="p-5 border border-gray-300 rounded-lg">
                  <Skeleton className="h-6 w-48 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CourseDetailsSkeleton;
