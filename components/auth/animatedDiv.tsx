import { TypingAnimation } from "../magicui/typing-animation";
import { useAppContext } from "@/context/context";
import { Button } from "../ui/button";

const AnimatedDiv = () => {
    const { isSignUp, setIsSignUp } = useAppContext();

    return (
        <div
            className={`bg-[var(--color-50)] flex-1 py-20 transition-transform duration-500`}
        >
            <div className="flex flex-col items-center">
                <img src="/logo-e-l.png" alt="youcef" height={150} width={150} className="mb-10" />
                <TypingAnimation className="text-3xl font-bold mb-5">
                    {isSignUp ? "Join Us!" : "Welcom Back"}
                </TypingAnimation>
                <p className="text-xl font-semibold mb-10">{isSignUp ? "Sign in to continue" : "Create an account"}</p>

                <Button variant={"outline"}
                    className="text-[var(--addi-color-500)] text-xl font-semibold border-[var(--addi-color-500)] py-3 hover:bg-[var(--color-100)]"
                    onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Sign In" : "sign Up"}
                </Button>


            </div>
        </div>
    );
};

export default AnimatedDiv;
