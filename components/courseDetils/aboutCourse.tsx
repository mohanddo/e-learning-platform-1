import { CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const AboutCourse = () => {

    const learnings: string[] = [
        "Basic communication in English in everyday situations.",
        "You will develop excellent understanding and listening skills for this level.",
        "You will learn more than 1000 common words and phrases.",
        "You will develop excellent understanding and listening skills for this level.",
    ];
    const requirements: string[] = [
        "Basic knowledge of English.",
        "Access to a computer or smartphone with an internet connection.",
        "Willingness to practice speaking and listening regularly.",
        "No prior experience needed, just motivation to learn!",
    ];
    const Curriculum: { id: string, question: string, answer: string }[] = [
        {
            id: "item-1",
            question: "Introduction",
            answer: "Yes. It adheres to the WAI-ARIA design pattern. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: "item-2",
            question: "Chapter 1",
            answer: "Yes. It comes with default styles that match the other components' aesthetic. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: "item-3",
            question: "Chapter 2",
            answer: "Yes. It's animated by default, but you can disable it if you prefer. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];


    return (
        <div className="flex flex-col flex-3 p-20">
            <div className="mb-3">
                <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
                    This course is presented by
                </p>
                <div className="flex flex-row mb-3 py-1 px-2 items-center rounded-xl hover:bg-gray-200 cursor-alias w-[30%]">
                    <Avatar className="w-10 h-10 mr-2">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>    
                    <span className="text-lg font-semibold">
                        Instructor    
                    </span>         
                </div>
                <p className="text-sm text-gray-400 w-full">
                    Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit.
                    Aperiam voluptatem ex eaque
                    dignissimos dolore ab dolorem
                    iure temporibus assumenda. Consectetur
                    velit, autem debitis magnam fuga ab
                    ullam a dolores nulla.
                    Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit.
                    Aperiam voluptatem ex eaque
                    dignissimos dolore ab dolorem
                    iure temporibus assumenda. Consectetur
                    velit, autem debitis magnam fuga ab
                    ullam a dolores nulla.
                </p>

            </div>

            <div className="mb-3">
                <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
                    About this course
                </p>
                <p className="text-sm text-gray-400 w-full">
                    Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit.
                    Aperiam voluptatem ex eaque
                    dignissimos dolore ab dolorem
                    iure temporibus assumenda. Consectetur
                    velit, autem debitis magnam fuga ab
                    ullam a dolores nulla.
                    Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit.
                    Aperiam voluptatem ex eaque
                    dignissimos dolore ab dolorem
                    iure temporibus assumenda. Consectetur
                    velit, autem debitis magnam fuga ab
                    ullam a dolores nulla.
                </p>
            </div>
            <div className="mb-3">
                <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
                    What you will learn
                </p>
                <div className="w-full">
                    {learnings.map((item, index) => (
                        <div key={index}
                            className="flex items-start gap-2 w-full mb-1">
                            <CheckCircle className="text-[var(--wr-color-9)] w-5 h-5" />
                            <p className="text-sm text-gray-400 ">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-10">
                <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
                    Requerement
                </p>
                <div>
                    {requirements.map((item, index) => (
                        <div key={index}
                            className="flex items-start gap-2 mb-1">
                            <CheckCircle className="text-[var(--wr-color-9)] w-5 h-5" />
                            <p className="text-sm text-gray-400 ">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-10 border-t border-gray-300 w-full">
                <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
                    Curriculum
                </p>
                <div className="flex flex-col justify-center">
                    <Accordion type="single" collapsible className="w-[90%]">
                        {Curriculum.map((item) => (
                            <AccordionItem key={item.id} value={item.id} className="border-none shadow-md mb-3 rounded-lg">
                                <AccordionTrigger className="py-4 px-5 text-lg font-bold data-[state=open]:bg-[var(--color-100)]">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm text-gray-400 w-full px-5 py-10">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default AboutCourse;