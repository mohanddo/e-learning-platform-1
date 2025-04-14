import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Course } from "../types";
import { courses } from "@/app/data";

const SecPanel = () => {



    return (
        <div className="w-[80%]">
            <Accordion type="single" collapsible className="w-[90%]">

                <AccordionItem value ={"Progress"} className="border-none shadow-md mb-3 rounded-lg">
                    <AccordionTrigger className="py-4 px-5 text-lg font-bold data-[state=open]:bg-[var(--color-100)]">
                        Progress
                    </AccordionTrigger>
                    <AccordionContent className="text-sm w-full px-5 py-10">
                        {courses.slice(0,3).map((crs) => (
                            <div className="flex flex-row justify-between mb-5 border border-gray-300 items-center py-1 px-5 rounded-lg hover:bg-gray-300">
                                <div className="flex flex-col">
                                    <p className="font-bold mb-2">{crs.title}</p>
                                    <p className="">{crs.teacher}</p>
                                </div>
                                <p className="text-green-500">
                                    50 %
                                </p>

                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value ={"notifications"} className="border-none shadow-md mb-3 rounded-lg">
                    <AccordionTrigger className="py-4 px-5 text-lg font-bold data-[state=open]:bg-[var(--color-100)]">
                        Notifications
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-400 w-full px-5 py-10">
                        
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value ={""} className="border-none shadow-md mb-3 rounded-lg">
                    <AccordionTrigger className="py-4 px-5 text-lg font-bold data-[state=open]:bg-[var(--color-100)]">
                        
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-400 w-full px-5 py-10">
            
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    )
}

export default SecPanel;