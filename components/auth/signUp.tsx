import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { useRouter } from 'next/navigation';

const SignUp = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const isMounted = useRef(false);


    const signUpMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: authApi.register,
        onSuccess: (data) => {
            if (!isMounted.current) return;
        //    login(data)
           console.log(data)
           router.push('/')
        },
        onError: (error) => {
            if (!isMounted.current) return;
            alert("There was an error please try again")
            console.log(JSON.stringify(error))
        }
    });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return (

        <div className="p-10 flex-1 flex justify-center flex-col items-start">
                           <p className="text-3xl font-bold">
                                Create Account
                            </p>
            <input type="text" placeholder="First Name" className="w-full p-2 mt-4 border rounded" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" className="w-full p-2 mt-4 border rounded" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <input type="email" placeholder="Email" className="w-full p-2 mt-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" className="w-full p-2 mt-4 border rounded" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className="w-full bg-[var(--addi-color-400)] text-white py-2 mt-4 rounded">Sign Up</button>
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

export default SignUp;