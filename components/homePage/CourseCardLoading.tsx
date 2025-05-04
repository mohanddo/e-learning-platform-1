import { Skeleton } from "@/components/ui/skeleton";

const CourseCardLoading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 mb-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="flex flex-col p-5 rounded-2xl overflow-hidden shadow-lg bg-white"
        >
          <Skeleton className="w-full h-72 mb-2 rounded-2xl" />
          <div className="flex flex-col items-center space-x-3 w-full mb-2">
            <div className="flex flex-row justify-between w-full mb-2">
              <div className="flex flex-row items-center">
                <Skeleton className="w-10 h-10 mr-2 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-6 w-20 rounded-2xl" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="w-full flex flex-row justify-between font-semibold mb-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="w-full flex flex-row justify-between py-1">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCardLoading;
