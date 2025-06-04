// SignPage.tsx
"use client";
import AnimatedDiv from "@/components/auth/animatedDiv";
import SignIn from "@/components/auth/signeIn";
import SignUp from "@/components/auth/signUp";
import { useAppContext } from "@/context/context";

const SignPage = () => {
  const { isSignUp } = useAppContext();

  return (
    <div className="relative bg-white w-[60%] flex rounded-lg shadow-lg overflow-hidden">
      <AnimatedDiv />
      {isSignUp ? <SignUp /> : <SignIn />}
    </div>
  );
};

export default SignPage;
