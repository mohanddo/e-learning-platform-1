"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from "@tanstack/react-query";
import { authApi } from '@/api/auth.api';

const Verify = () => {
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const verifyMutation = useMutation({
        mutationKey: ['verify'],
        mutationFn: authApi.verifyEmail,
        onSuccess: () => {
            router.push('/');
        },
        onError: (error) => {
            setError('Invalid verification code. Please try again.');
            console.error(error);
        }
    });

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple characters
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const code = verificationCode.join('');
        if (code.length !== 6) {
            setError('Please enter the complete verification code');
            return;
        }
        verifyMutation.mutate(code);
    };

    const handleResendCode = () => {
        if (!canResend) return;
        setResendTimer(60);
        setCanResend(false);
        // Add your resend code logic here
    };

    // Timer effect
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gray-100 pt-20">
            <div className="bg-white w-[60%] p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
                    <p className="text-gray-600">We&apos;ve sent a verification code to your email</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center space-x-4">
                        {verificationCode.map((digit, index) => (
                            <input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl border-2 rounded-lg focus:border-[var(--addi-color-400)] focus:outline-none"
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={verifyMutation.isPending}
                        className="w-full bg-[var(--addi-color-400)] text-white py-3 rounded-lg hover:bg-[var(--addi-color-500)] transition-colors disabled:opacity-50"
                    >
                        {verifyMutation.isPending ? 'Verifying...' : 'Verify Email'}
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => router.push('/auth')}
                            className="text-[var(--addi-color-400)] hover:text-[var(--addi-color-500)]"
                        >
                            Back to Sign In
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-gray-600 mb-2">Didn&apos;t receive the code?</p>
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={!canResend}
                            className={`text-[var(--addi-color-400)] hover:text-[var(--addi-color-500)] ${
                                !canResend ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Verify; 