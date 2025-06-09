import { Skeleton } from "@/components/ui/skeleton";

function LoadingHeader() {
  return (
    <div className="w-full h-[64px] flex items-center px-6 fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center mr-8">
        <Skeleton className="h-12 w-12 rounded-md" />
      </div>
      {/* Title */}
      <div className="flex-1">
        <Skeleton className="h-6 w-64" />
      </div>
      {/* Right controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function PurchasedCourseLoading() {
  return (
    <>
      <LoadingHeader />
      <div className="flex flex-row min-h-screen mt-[64px]">
        <div className="flex flex-col flex-1 max-w-[calc(100vw-31vw)]">
          {/* Video Section */}
          <div className="w-full aspect-video bg-gray-100">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Tabs Section */}
          <div className="p-6">
            <div className="flex justify-between gap-4 mb-6">
              <Skeleton className="h-10 w-35" />
              <Skeleton className="h-10 w-35" />
              <Skeleton className="h-10 w-35" />
              <Skeleton className="h-10 w-35" />
              <Skeleton className="h-10 w-35" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[31vw] border-l border-gray-200 p-4">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
