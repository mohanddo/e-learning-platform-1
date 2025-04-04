import { motion } from 'framer-motion';
import { useAppContext } from '../context/context';

const SignIn = () => {
    const { isSignUp, setIsSignUp } = useAppContext();

    return (

        <div className="p-10 flex-1 flex justify-center flex-col items-start">
            <h2 className="text-2xl font-bold">welcom back</h2>
            <input type="email" placeholder="Email" className="w-full p-2 mt-4 border rounded" />
            <input type="password" placeholder="Password" className="w-full p-2 mt-4 border rounded" />
            <a href="/" className='text-start mt-3 text-gray-400 text-sm font-bold'>Forgot password?</a>
            <button className="w-full bg-[var(--addi-color-400)] text-white py-2 mt-4 rounded">Sign In</button>
            <p className='text-start text-gray-400 text-sm font-bold mt-5'>Or Signe In with :</p>
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