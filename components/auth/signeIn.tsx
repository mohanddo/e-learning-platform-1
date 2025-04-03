import { motion } from 'framer-motion';
import { useAppContext } from '../context/context';

const SignIn = () => {
    const {isSignUp, setIsSignUp} = useAppContext();

    return (

        <div
            className="p-10 w-[100%] flex-1"
        >
            <h2 className="text-2xl font-bold">welcom back</h2>
            <input type="text" placeholder="Name" className="w-full p-2 mt-4 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 mt-4 border rounded" />
            <input type="password" placeholder="Password" className="w-full p-2 mt-4 border rounded" />
            <button className="w-full bg-teal-500 text-white py-2 mt-4 rounded">Sign In</button>
        </div>

    )
}

export default SignIn;