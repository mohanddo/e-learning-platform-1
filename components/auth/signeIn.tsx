"use client";

import { useAppContext } from "../../context/context";
import { useMutation } from "@tanstack/react-query";
import { commonAuthApi } from "@/api/auth/commonAuth.api";
import { useState, useRef, useEffect } from "react";
import { validateCredentials } from "@/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import showAlert from "../ui/AlertC";

const SignIn = () => {
  const { setEmailToVerify } = useAppContext();
  const router = useRouter();

  const isMounted = useRef(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: commonAuthApi.login,
    onSuccess: () => {
      showAlert("success", "Welcome back! You’re now logged in.");
      if (isMounted.current) {
        router.push("/profile");
      }
    },
    onError: (error: AxiosError) => {
      if (isMounted.current) {
        if (error.response?.status === 403) {
          setEmailToVerify(email);
          if (isMounted.current) {
            router.push("/auth/verify");
          }
        } else if (
          error.response?.status === 401 ||
          error.response?.status === 404
        ) {
          showAlert(
            "error",
            "Invalid email or password. Please check your credentials and try again."
          );
        } else {
          showAlert("error", "Something went wrong. Please try again.");
        }
      }
    },
  });

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCredentials(email, password);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="p-10 flex-1 flex justify-center flex-col items-start">
      <p className="text-3xl font-bold">Sign In To Your Account</p>
      <form onSubmit={handleLogin} className="w-full">
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full p-2 mt-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mt-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link
          href="/auth/resetPassword"
          className="text-start mt-3 text-gray-400 text-sm font-bold hover:text-gray-600 transition-colors"
        >
          Forgot password?
        </Link>
        <button
          type="submit"
          className="w-full bg-[var(--addi-color-400)] text-white py-2 mt-4 rounded cursor-pointer"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="text-start text-gray-400 text-sm font-bold mt-5">
        Or Sign In with :
      </p>
      <div className="w-full flex justify-center items-center mt-5">
        <button className="mr-5 border border-solid border-gray-300 h-12 w-12 rounded-full flex justify-center items-center text-lg font-bold hover:bg-gray-100">
          <i className="bx bxl-google"></i>
        </button>
        <button className="mr-5 border border-solid border-gray-300 h-12 w-12 rounded-full flex justify-center items-center text-lg font-bold hover:bg-gray-100">
          <i className="bx bxl-google"></i>
        </button>
        <button className="border border-solid border-gray-300 h-12 w-12 rounded-full flex justify-center items-center text-lg font-bold hover:bg-gray-100">
          <i className="bx bxl-google"></i>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
