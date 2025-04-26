export const LoadingState = () => {
    return (
        <section className="flex justify-center pt-[13vh]">
            <section className="w-[90%] p-5 flex flex-col gap-2.5">
                
                <div className="flex flex-col items-center justify-center py-20 bg-white">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-100)] border-t-[var(--addi-color-400)] animate-[spin_1s_linear_infinite]"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-100)] border-t-[var(--addi-color-400)] animate-[spin_1s_linear_infinite]" style={{ animationDelay: '-0.3s' }}></div>
                        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-100)] border-t-[var(--addi-color-400)] animate-[spin_1s_linear_infinite]" style={{ animationDelay: '-0.6s' }}></div>
                    </div>
                    <p className="mt-6 text-lg text-[var(--color-700)] font-medium">Loading your profile...</p>
                    <p className="mt-2 text-sm text-[var(--color-400)]">Please wait while we fetch your information</p>
                </div>
            </section>
        </section>
    );
};