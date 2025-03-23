"use client"
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import categories from "../../app/data"
import { Button } from "../ui/button";
import { useState } from "react";
import { useAppContext } from "../context/context";
import CourseCard from "./courseCard";

const FilterDiv = () => {

    const { categorie, setCategorie } = useAppContext();

    const [startIndex, setStartIndex] = useState<number>(0);
    const categoriesPerpage = 5

    const currentSet: { id: number, name: string }[] = categories.categories.slice(startIndex, startIndex + categoriesPerpage);

    const handelNext = () => {
        const nextIndex = startIndex + 1;
        return nextIndex < categories.categories.length ? setStartIndex(nextIndex) : setStartIndex(categories.categories.length - categoriesPerpage);
    }

    const handelPrev = () => {
        const prevIndex = startIndex - 1;
        return prevIndex >= 0 ? setStartIndex(prevIndex) : setStartIndex(0);
    }


    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-row h-[10vh] items-center mb-5">
                <div className="flex-1 flex justify-start pl-32">
                    <p className="text-3xl font-bold flex pl-16 ">
                        Our <span className="text-[var(--addi-color-500)] ml-0.5"> Courses</span>
                    </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="border-1 border-solid border-gray-400 flex flex-row items-center px-1 py-1 w-auto rounded-lg">
                        <input type="text"
                            placeholder="Seartch for a course"
                            className="focus:outline-none focus:ring-0 focus:border-transparent w-md" />
                        <button className="px-1.5 rounded-lg py-1.5 bg-[var(--color-100)] text-[var(--color-400)] hover:text-[var(--addi-color-500)]">
                            <Search />
                        </button>
                    </div>
                </div>
            </div>
            {categorie}
            <div className="w-full mb-2 flex items-center justify-center">
                <div className="w-[70%] h-20 px-5 flex flex-row justify-center items-center border border-solid border-gray-300 rounded-lg bg-[var(--color-50)]">
                    <div className="flex-[0.2] h-full flex items-center justify-center">
                        <Button variant="outline" size="icon"
                            className="hover:bg-[var(--color-100)] disabled:bg-gray-300"
                            onClick={handelPrev}
                            disabled={startIndex === 0}>
                            <ChevronLeft />
                        </Button>
                    </div>

                    <div className="flex-[4] flex flex-row flex-wrap items-center justify-around">
                        {
                            currentSet.map((ca) => (
                                <Button key={ca.id}
                                    variant="outline"
                                    className={`w-32 border-gray-300 hover:text-[var(--addi-color-500)] 
                                                hover:border-[var(--addi-color-500)] hover:font-semibold 
                                                ${ca.name === categorie ? "text-[var(--addi-color-500)]  border-[var(--addi-color-500)] font-semibold" : ""}`}
                                    onClick={() => { ca.name === categorie ? setCategorie("All") : setCategorie(ca.name) }}>
                                    {ca.name}
                                </Button>
                            ))
                        }
                    </div>

                    <div className="flex-[0.2] h-full flex items-center justify-center">
                        <Button variant="outline" size="icon"
                            className="hover:bg-[var(--color-100)] disabled:bg-gray-300"
                            onClick={handelNext}
                            disabled={(startIndex + categoriesPerpage) === categories.categories.length}>
                            <ChevronRight />
                        </Button>
                    </div>
                </div>

            </div>
            <CourseCard 
                course={{
                    id: 1,
                    title: "Calculus 101",
                    category: "Mathematics",
                    teacher: "Dr. John Doe",
                    pictureUrl: "/exmp1.jpg",
                    description: "Learn the fundamentals of calculus with real-world examples.",
                    students: 150,
                    price: 49.99,
                    discount: true,
                    rating: 4,
                    type: "prerecorded",
                }} 
            />
        </div>
    )
}

export default FilterDiv;