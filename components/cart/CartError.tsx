import { Button } from "@/components/ui/button";

const CartError = ( {refetch}: {refetch: () => void} ) => {
    return (
        <div className="w-full max-w-6xl mx-auto mt-30 px-4 sm:px-6 lg:px-8">
            <div className="w-full text-center py-16 bg-red-50 rounded-lg">
                <p className="text-red-600 text-lg font-medium mb-2">Something went wrong</p>
                <p className="text-red-500 mb-6">We couldn&apos;t load your cart. Please try again.</p>
                <Button 
                    className="bg-red-500 text-white hover:bg-red-600 px-6 py-2"
                    onClick={refetch}
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
};

export default CartError; 