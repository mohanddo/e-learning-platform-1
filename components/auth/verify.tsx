"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { commonAuthApi } from "@/api/auth/commonAuth.api";
import { useAppContext } from "@/context/context";

import showAlert from "../ui/AlertC";
import { AxiosError } from "axios";

const verificationCodeExpirationTime =
  process.env.VERIFICATION_CODE_EXPIRATION_TIME || "300";

const Verify = () => {
  const router = useRouter();
  const { emailToVerify } = useAppContext();
  const [verificationCodeArray, setVerificationCodeArray] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState<number>(
    parseInt(verificationCodeExpirationTime)
  );
  const [canResend, setCanResend] = useState(false);
  const isMounted = useRef(false);

  const verifyMutation = useMutation({
    mutationFn: commonAuthApi.verifyEmail,
    onSuccess: () => {
      showAlert("success", "Your account has been successfully verified.");

      if (isMounted.current) {
        router.push("/profile");
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        showAlert("error", "Invalid verification code. Please try again.");
      } else if (error.response?.status === 410) {
        showAlert(
          "error",
          "This verification code has expired. Please request a new one."
        );
      } else {
        showAlert("error", "Something went wrong. Please try again.");
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: commonAuthApi.resendVerificationEmail,
    onSuccess: () => {
      if (isMounted.current) {
        setResendTimer(parseInt(verificationCodeExpirationTime));
        setCanResend(false);
      }
    },
    onError: () => {
      if (isMounted.current) {
        setError("Failed to resend verification code. Please try again.");
      }
    },
  });

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    setError("");

    const newCode = [...verificationCodeArray];
    newCode[index] = value;
    setVerificationCodeArray(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    if (index === 5) {
      const code = newCode.join("");
      if (code.length === 6) {
        verifyMutation.mutate({
          email: emailToVerify!,
          verificationCode: code,
        });
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    setError("");
    if (e.key === "Backspace" && !verificationCodeArray[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCodeArray.join("");
    if (code.length !== 6) {
      setError("Please enter the complete verification code");
      return;
    }

    verifyMutation.mutate({ email: emailToVerify!, verificationCode: code });
  };

  const handleResendCode = () => {
    if (!canResend) return;
    resendMutation.mutate(emailToVerify!);
  };

  // Timer effect
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100 pt-20">
      <div className="bg-white w-[60%] p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We&apos;ve sent a verification code to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-4">
            {verificationCodeArray.map((digit, index) => (
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

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="w-full bg-[var(--addi-color-400)] text-white py-3 rounded-lg hover:bg-[var(--addi-color-500)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600 mb-2">Didn&apos;t receive the code?</p>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || resendMutation.isPending}
              className={`text-[var(--addi-color-400)] hover:text-[var(--addi-color-500)] cursor-pointer ${
                !canResend || resendMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {resendMutation.isPending
                ? "Resending..."
                : canResend
                ? "Resend Code"
                : `Resend in ${resendTimer}s`}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Verify;
