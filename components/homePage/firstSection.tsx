import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { TextAnimate } from "@/components/magicui/text-animate";
import { NumberTicker } from "../magicui/number-ticker";

const FirstSection = () => {
  return (
    <section className="h-auto w-full flex flex-row pt-[3%] bg-[var(--color-50)]">
      <div className="flex-1 flex flex-col justify-center h-screen pt-[5%] pl-16">
        <TextAnimate
          animation="blurInUp"
          by="character"
          once
          className="text-4xl text-[var(--addi-color-500)] font-bold"
        >
          E Learning Platform
        </TextAnimate>
        <p className="text-[var(--addi-color-500)] text-sm font-bold mb-9">
          Start Your Favorite Course Today
        </p>
        <div className=" mb-16">
          <TypingAnimation className="text-3xl font-bold">
            You can now learn from anywhere, and build a bright career
          </TypingAnimation>
        </div>
        <div className="w-[70%] mb-9">
          <p className="text-sm font-bold text-gray-400">
            it has survived not only five centuries but also the leap into
            electronic typesetting
          </p>
        </div>
        <div className="w-full">
          <InteractiveHoverButton className="btn-principal ">
            Start Course
          </InteractiveHoverButton>
        </div>
      </div>
      <div className="relative flex-2 flex items-center justify-center">
        <div className="absolute w-40 h-40 bg-[var(--addi-color-400)] rounded-full left-[15vw] top-20 flex flex-col items-center justify-center text-white text-2xl font-bold">
          <p>More Than </p>
          <p>
            <NumberTicker startValue={26} value={40} /> +
          </p>
          <p>Teacher</p>
        </div>

        <div className="absolute w-40 h-40 bg-[var(--addi-color-400)] right-[15vw] bottom-[10vw] rounded-full text-white text-2xl font-bold flex flex-col items-center justify-center">
          <p>More Than </p>
          <p>
            <NumberTicker startValue={26} value={40} /> +
          </p>
          <p>Student</p>
        </div>

        <img
          src="/image-1-el.png"
          alt="image non disponible"
          className="w-[60%]"
        />
      </div>
    </section>
  );
};

export default FirstSection;
