// SignPage.tsx
"use client"
import AnimatedDiv from "@/components/auth/animatedDiv";
import SignIn from "@/components/auth/signeIn";
import SignUp from "@/components/auth/signUp";
import { useAppContext } from "@/context/context";

const SignPage = () => {
    const { isSignUp } = useAppContext();
    
    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gray-100 pt-20">
            <div className="relative bg-white w-[60%] flex rounded-lg shadow-lg overflow-hidden">
                
                        <AnimatedDiv />
                        {isSignUp ? <SignUp /> : <SignIn />}
                    
                
            </div>
        </section>
    );
};

export default SignPage;