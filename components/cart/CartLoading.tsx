import { Skeleton } from "@/components/ui/skeleton";

const CartLoading = () => {
    return (
        <div className="w-full max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-48 mb-10" />
            
            <div className="flex flex-col gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex flex-row items-center p-6 border border-gray-200 rounded-lg">
                        <Skeleton className="w-[120px] h-[120px] rounded-lg mr-6" />
                        
                        <div className="flex-1">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>

                        <div className="flex items-center gap-6">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </div>
                ))}

                    <div  className="flex flex-row items-center p-6 border border-gray-200 rounded-lg mb-10">
                        <Skeleton className="w-[120px] h-[120px] rounded-lg mr-6" />
                        
                        <div className="flex-1">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>

                        <div className="flex items-center gap-6">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </div>

            
            </div>
        </div>
    );
};

export default CartLoading; 