import { Search } from "lucide-react";
const FilterDiv = () => {

    return (
        <div className="flex flex-row h-[10vh]  items-center">
            <div className="flex-1 flex justify-start pl-32">
                <p className="text-3xl font-bold flex pl-16 ">
                    Our <span className="text-[var(--addi-color-500)] ml-0.5"> Courses</span>
                </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="border-1 border-solid border-gray-400 flex flex-row items-center px-1 py-1 w-auto rounded-lg">
                    <input type="text"
                        placeholder="Seartch for a course" 
                        className="focus:outline-none focus:ring-0 focus:border-transparent w-md"/>
                    <button className="px-1.5 rounded-lg py-1.5 bg-[var(--color-100)] text-[var(--color-400)] hover:text-[var(--addi-color-500)]">
                        <Search />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilterDiv;