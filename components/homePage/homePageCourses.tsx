"use client"
import {courses} from "@/app/data"
import { Course } from "../types";
import { useAppContext } from "../../context/context";
import { useEffect, useState } from "react";
import CourseCard from "./courseCard";
import { Button } from "../ui/button";


const HomePageCourses = () => {
    const {categorie} = useAppContext();
    const [currentSet, setCurrentSet] = useState<Course[]>([]); 
    const [count, setCount] = useState<number>(0)
    
    useEffect(() => {
        if(categorie === "All") {
            const cur = courses.slice(count,count + 6);
            setCurrentSet(cur);
        } else {
            const cur: Course[] = courses.filter((pr) => 
                pr.category === categorie
            );

            setCurrentSet(cur);
        }

    }, [courses, categorie]);

    useEffect(() => {
        console.log(currentSet);
        
    }, [currentSet])

    return(
        <section className="mb-5">
            <div className="flex flex-row flex-wrap gap-3 items-center justify-center mb-5">
                {currentSet.map((crs) => (
                    <CourseCard key={crs.id} course={(crs)}/>
                ))}
            </div>

            <div className="w-full flex justify-around">
                <Button variant={"outline"}
                onClick={() => setCount(count + 6)}
                        className="border border-solid border-[var(--addi-color-500)] bg-[var(--color-100)] text-[var(--addi-color-500)] hover:bg-[var(--color-200)]">
                    prev
                </Button>
                <p>
                    1
                </p>
                <Button variant={"outline"}
                        onClick={() => setCount(count - 6)}
                        
                        className="border border-solid border-[var(--addi-color-500)] bg-[var(--color-100)] text-[var(--addi-color-500)] hover:bg-[var(--color-200)]">
                    next
                </Button>
            </div>
        </section>
    )
}

export default HomePageCourses;