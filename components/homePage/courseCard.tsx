"use client"

import { Course } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Radio, Video, Star } from "lucide-react"
import { useState } from "react";
import { Button } from "../ui/button";



const CourseCard = ({ course }: { course: Course }) => {


    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);


    return (
        <div className="flex flex-col p-5 rounded-2xl overflow-hidden shadow-lg bg-white w-xs "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => isMobile && setIsHovered(!isHovered)}>
            <img src={course.pictureUrl} alt="sorry image non disponble"
                className="w-full h-72 object-cover mb-2 rounded-2xl" />
            <div className="flex flex-col items-center space-x-3 w-full mb-2">
                <div className="flex flex-row justify-between w-full mb-2">
                    <div className="flex flex-row items-center">
                        <Avatar className="w-10 h-10 mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">
                            {course.teacher}
                        </span>
                    </div>
                    <span className="bg-[var(--color-50)] flex items-center rounded-2xl px-2 text-[var(--addi-color-500)] border-[var(--addi-color-500)] border-solid border">
                        {course.category}
                    </span>
                </div>
                <p className="text-lg font-bold mb-2 line-clamp-1">
                    {course.title}
                </p>
                <div className="w-full flex flex-row justify-between font-semibold mb-3">
                    <span className="flex flex-row">
                        {course.type === "live" ? <Radio className="mr-1 text-red-500" /> : <Video className="mr-1 text-green-500" />} {course.type}
                    </span>
                    <span>
                        6 chapters
                    </span>
                </div>

                {
                    isHovered ? (
                        <div className="w-full flex flex-row justify-between py-1">
                            <Button className="text-white font-semibold bg-[var(--addi-color-400)] px-5 py-3 rounded-lg hover:bg-[var(--addi-color-500)]">
                                Add To Cart
                            </Button>
                            <Button variant={"outline"}
                                className="text-[var(--addi-color-500)] font-semibold border-[var(--addi-color-500)] py-3 hover:bg-[var(--color-100)]">
                                See Course details
                            </Button>
                        </div>

                    ) : (
                        <div className="w-full flex flex-row justify-between bg-green-100 py-2 px-1 rounded-2xl">

                            {course.discount ? (
                                <span className="flex flex-row">
                                    <p className="text-green-600 text-lg font-bold">{course.price} DA</p>
                                    <p className="text-gray-400 text-sm font-semibold line-through ml-2">{course.price} DA</p>
                                </span>
                            ) : (
                                <span className="text-green-600 text-lg font-bold">
                                    {course.price} DA
                                </span>
                            )}

                            <span className="flex flex-row items-center">
                                <p className="text-lg mr-1.5 font-semibold">{course.rating}</p> <Star className="text-yellow-500 font-semibold" />
                            </span>

                        </div>
                    )
                }


            </div>

        </div>
    )
}

export default CourseCard;