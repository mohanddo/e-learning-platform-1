"use client"
import Verify from "@/components/auth/verify";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VerifyPage = () => {
    const { verificationCode } = useAppContext();
    const router = useRouter();
    
    useEffect(() => {
            if (!verificationCode) {
            router.push('/');
        } 
    }, [verificationCode, router]);

    if (!verificationCode) {
        return (
          <div className="h-screen w-full flex items-center justify-center">
            <p>Redirecting...</p>
          </div>
        );
    }

    return (
        <section className="min-h-screen w-full bg-gray-100">
            <div className="container mx-auto px-4">
                <Verify verificationCode={verificationCode} />
            </div>
        </section>
    );
};

export default VerifyPage; 