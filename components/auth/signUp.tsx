import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth/studentAuth.api";
import { useAppContext } from "@/context/context";
import { validateCredentials } from "@/utils";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import showAlert from "../ui/AlertC";

const SignUp = () => {
  const { setEmailToVerify } = useAppContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const isMounted = useRef(false);

  const signUpMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      setEmailToVerify(email);
      if (isMounted.current) {
        router.push("/auth/verify");
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        showAlert("error", "An account with this email already exists.");
      } else {
        showAlert("error", "Something went wrong. Please try again.");
      }
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCredentials(email, password);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    if (firstName.length === 0 || lastName.length === 0) {
      alert("Please enter your first and last name");
      return;
    }

    signUpMutation.mutate({ email, password, firstName, lastName });
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="p-10 flex-1 flex justify-center flex-col items-start">
      <p className="text-3xl font-bold">Create Account</p>
      <form onSubmit={handleRegister} className="w-full">
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 mt-4 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 mt-4 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
          autoComplete="new-password"
          className="w-full p-2 mt-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[var(--addi-color-400)] text-white py-2 mt-4 rounded cursor-pointer"
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? "Signing Up..." : "Sign Up"}
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

export default SignUp;
