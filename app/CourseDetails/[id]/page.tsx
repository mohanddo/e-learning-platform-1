"use client"

import { courses } from "@/app/data"
import { useParams } from "next/navigation"
import { ChevronRight } from "lucide-react"


const CourseD = () => {

    const { id } = useParams<{ id: string }>();
    const course = courses.find((crs) => crs.id === Number(id));

    return (
        <section className="flex flex-col">
            <section className="w-full h-[50vh] pt-[7%] flex justify-center">
                <div className="h-full w-[90%] flex flex-col items-center justify-center bg-[var(--color-100)] rounded-xl">
                    <p className="text-3xl font-bold text-[var(--wr-color-9)] mb-5">
                        Course details
                    </p>
                    <p className="inline-flex font-bold text-sm items-center mb-2">
                        Home <ChevronRight className="font-bold text-sm"/> Course Details
                    </p>

                    <p className="text-xl font-bold">
                        {course?.title}
                    </p>
                </div>
            </section>
        </section>
    )
}
export default CourseD