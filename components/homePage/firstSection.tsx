import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Button } from "@/components/ui/button"



const FirstSection = () => {

    return (
        <section className="h-auto w-full flex flex-row pt-[3%] bg-[var(--color-50)]">
            <div className="flex-1 flex flex-col h-screen pt-[10%] pl-16">
                <p className="text-[var(--addi-color-500)] text-sm font-bold mb-9">
                    Start Your favorit cours
                </p>
                <div className=" mb-16">
                    <p className="text-4xl font-bold">
                        Now learning from anywhere, and build your <span className="text-[var(--addi-color-500)]">bright career</span>
                    </p>
                </div>
                <div className="w-[70%] mb-9">
                    <p className="text-sm font-bold text-gray-400">
                        it has survived not only five centuries but also the leap into electronic typesetting
                    </p>
                </div>
                <div className="w-full">
                    <InteractiveHoverButton className="text-white text-lg font-bold bg-[var(--addi-color-500)] px-6 py-3 rounded-lg">
                        start course
                    </InteractiveHoverButton>
                </div>
            </div>
            <div className="flex-2 flex items-center justify-center">
                <img src="/image-1-el.png" alt="image non disponible"
                    className="w-[70%]" />
            </div>
        </section>
    )
}

export default FirstSection;