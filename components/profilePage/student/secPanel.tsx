import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/navigation";

const SecPanel = () => {
  const { student } = useAppContext();
  const router = useRouter();
  const goToPage = (id: number) => {
    router.replace(`/courseDetails/${id}`);
  };

  const enrolledCourses = student!.courses.filter((crs) => crs.enrolled);

  return (
    <div className="w-[80%]">
      <Accordion type="single" collapsible className="w-[90%]">
        <AccordionItem
          value={"Progress"}
          className="border-none shadow-md mb-3 rounded-lg"
        >
          <AccordionTrigger className="py-4 px-5 text-lg font-bold data-[state=open]:bg-[var(--color-100)]">
            Progress
          </AccordionTrigger>
          <AccordionContent className="text-sm w-full px-5 py-10">
            {enrolledCourses.length === 0 ? (
              <div className="text-center text-gray-500">
                You are not enrolled in any courses.
              </div>
            ) : (
              enrolledCourses.map((crs) => (
                <div
                  key={crs.id}
                  className="flex flex-row justify-between mb-5 border border-gray-300 items-center py-1 px-5 rounded-lg hover:bg-gray-300"
                  onClick={() => goToPage(crs.id)}
                >
                  <div className="flex flex-col">
                    <p
                      className="font-bold mb-2 truncate max-w-[200px]"
                      title={crs.title}
                    >
                      {crs.title}
                    </p>
                    <p className="">
                      {crs.teacher.firstName + " " + crs.teacher.lastName}
                    </p>
                  </div>
                  <p className="text-green-500">{crs.progressPercentage}%</p>
                </div>
              ))
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value={"notifications"}
          className="border-none shadow-md mb-3 rounded-lg"
        >
          <AccordionTrigger className="py-4 px-5 text-lg font-bold data-[state=open]:bg-[var(--color-100)]">
            Notifications
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-400 w-full px-5 py-10"></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SecPanel;
