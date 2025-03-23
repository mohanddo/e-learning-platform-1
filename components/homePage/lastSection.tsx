import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";


const Join = () => {

    return(
        <section className="w-full flex justify-center mb-5">
            <div className="w-[90%] px-14 flex flex-row justify-between bg-[var(--color-50)] rounded-xl items-center">
                <div className="py-4">
                    <p className="text-sm font-bold text-[var(--addi-color-500)] mb-5">Become an Instructor</p>
                    <p className="text-3xl font-bold">You can join with our Platform</p>
                    <p className="text-3xl font-bold">as <span className="text-[var(--addi-color-500)]">an instructor</span></p>
                </div>
                <div>
                    <InteractiveHoverButton className="text-white text-lg font-bold bg-[var(--addi-color-500)] px-6 py-3 rounded-lg">
                        Drop informations
                    </InteractiveHoverButton>
                </div>
            </div>
        </section>
    )
}

export default Join;