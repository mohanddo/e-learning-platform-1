import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SecPanel = () => {
  return (
    <div className="w-[80%]">
      <Accordion type="single" collapsible className="w-[90%]">
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
