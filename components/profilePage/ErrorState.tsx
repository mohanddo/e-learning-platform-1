export const ErrorState = ({ refetch }: { refetch: () => void }) => {
    return (
        <section className="flex justify-center pt-[13vh]">
            <section className="w-[90%] p-5 flex flex-col gap-2.5">
                
                <div className="flex flex-col items-center justify-center py-20 bg-white">
                    <div className="text-[var(--addi-color-400)] text-6xl mb-6">⚠️</div>
                    <h2 className="text-2xl font-bold text-[var(--color-800)] mb-3">Something went wrong</h2>
                    <p className="text-[var(--color-600)] mb-6 text-center max-w-md">
                        We couldn&apos;t load your profile information. This might be due to a temporary issue or network problem.
                    </p>
                    <button 
                        onClick={refetch} 
                        className="px-6 py-3 bg-[var(--addi-color-400)] text-white rounded-lg hover:bg-[var(--addi-color-500)] transition-colors font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        </section>
    );
};