"use client"

import { useAppContext } from '../../context/context';
import {  useMutation } from "@tanstack/react-query";
import { authApi } from '@/api/auth.api';
import { useState, useRef, useEffect } from 'react';
import { validateCredentials } from '@/utils/validations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AxiosError } from 'axios';

const SignIn = () => {
    const { login, setEmailToVerify } = useAppContext();
    const router = useRouter();

    const isMounted = useRef(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useMutation({
        mutationKey: ['login'], 
        mutationFn: authApi.login,
        onSuccess: (data) => {    
           login(data)
           console.log(data)
           if (isMounted.current) {
                router.push('/')
           } 
        },
        onError: (error: AxiosError) => {
            if (isMounted.current) {
                if (error.response?.status === 403) {
                    alert("Your account is not verified. Press ok to redirect to the verification page.");
                    setEmailToVerify(email)
                    resendMutation.mutate(email)
                    if (isMounted.current) {
                        router.push('/verify')
                    }
                } else if (error.response?.status === 401 || error.response?.status === 404) {
                    alert("Invalid email or password. Please check your credentials and try again.");
                } else {
                    alert("There was an error. Please try again later.");
                }
                console.log(JSON.stringify(error));
            }
        }
    });

    const resendMutation = useMutation({
        mutationKey: ['resend'],
        mutationFn: authApi.resendVerificationEmail
    });

    useEffect(() => {

        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleLogin = (e : React.FormEvent) => {
        e.preventDefault();

        const validation = validateCredentials(email, password);
        if (!validation.isValid) {
            alert(validation.message);
            return;
        }

        loginMutation.mutate({ email, password });
    }

    return (
        <div className="p-10 flex-1 flex justify-center flex-col items-start">
            <p className="text-3xl font-bold">
                Sign In To Your Account
            </p>
            <input type="email" placeholder="Email" className="w-full p-2 mt-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full p-2 mt-4 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Link href="/ResetPassword" className="text-start mt-3 text-gray-400 text-sm font-bold hover:text-gray-600 transition-colors">Forgot password?</Link>
            <button className="w-full bg-[var(--addi-color-400)] text-white py-2 mt-4 rounded"
                    onClick={(e) => handleLogin(e)}
                    disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </button>
            <p className='text-start text-gray-400 text-sm font-bold mt-5'>Or Sign In with :</p>
            <div className='w-full flex justify-center items-center mt-5'>
                <button className='mr-5 border border-solid border-gray-300 h-12 w-12 rounded-full flex justify-center items-center text-lg font-bold hover:bg-gray-100'>
                    <i className='bx bxl-google'></i>
                </button>
                <button className='mr-5 border border-solid border-gray-300 h-12 w-12 rounded-full flex justify-center items-center text-lg font-bold hover:bg-gray-100'>
                    <i className='bx bxl-google'></i>
                </button>
                <button className='border border-solid border-gray-300 h-12 w-12 rounded-full flex justify-center items-center text-lg font-bold hover:bg-gray-100'>
                    <i className='bx bxl-google'></i>
                </button>
            </div>
        </div>
    )
}

export default SignIn;