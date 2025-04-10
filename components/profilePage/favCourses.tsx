
import { courses } from "@/app/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Course } from "../types";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useRouter } from "next/router";

const FavoritCouses = () => {

    return(
        <div className="w-full">
            <p className="text-xl font-semibold mb-10">You Courses</p>
            <AnimatedList className="w-full flex flex-col justify-center gap-5">
                {courses.slice(0,2).map((crs) => (
                    <div className="w-[80%] flex flex-row items-center mb-2 p-5 border border-gray-200 rounded-lg hover:bg-gray-200">
                        <img src={crs.pictureUrl} alt={crs.title} width={100} height={100} className="mr-20" />
                        <div className="flex-1 mr-20">
                            <p className="font-semibold mb-2">{crs.title}</p>
                            <p>{crs.category}</p>
                        </div>
                        <div className="flex-1 flex flex-row gap-5">
                            <p className="flex-1">{crs.teacher}</p>
                            <Avatar className="w-10 h-10 mr-2 ">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                ))}
            </AnimatedList>
        </div>
    )
}

export default FavoritCouses;