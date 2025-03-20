
import { Button } from "@/components/ui/button"



const FirstSection = () => {

    return (
        <section className="w-full h-auto flex flex-row pt-28 bg-[var(--color-50)]">
            <div className="flex-1 flex flex-col h-screen pt-[10%] pl-16">
                <p className="text-[var(--addi-color-500)] text-sm font-bold mb-9">
                    Start Your favorit cours
                </p>
                <div className=" mb-16">
                    <p className="text-4xl font-bold">
                        Now learning from anywhere, and build your <span className="text-[var(--addi-color-500)]">bright career</span>
                    </p>
                </div>
                <div className="w-[50%] mb-9">
                    <p className="text-sm font-bold text-gray-400">
                        it has survived not only five centuries but also the leap into electronic typesetting
                    </p>
                </div>
                <div className="w-full">
                    <Button variant="outline" className="text-white text-lg font-bold bg-[var(--addi-color-500)] px-10 py-6">
                        start course
                    </Button>
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