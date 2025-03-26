import { link } from "fs";
import { Button } from "../ui/button";
import { ShoppingCart, Video, Clock, File, Phone,Mail,Play } from "lucide-react"; // Assuming ShoppingCart is from react-icons




const JoineCourse = () => {
    return (
        <div className="flex-2 flex-col flex p-28 items-center">
            <div className="flex flex-col justify-center shadow-lg w-[80%] mb-5">
                <div className="mb-15 relative flex items-center justify-center">
                    <img src="/exmp1.jpg" alt="image non disponible"
                        className="w-full h-72 rounded-t-xl brightness-50" />
                        <Button className="absolute flex items-center justify-center w-13 h-13 rounded-full bg-white text-lg">
                            <Play className="text-[var(--addi-color-500)] "/>
                        </Button>
                </div>

                <div className="p-5">
                    <div className=" flex flex-col mb-5">
                        <Button className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white text-md font-semibold mb-2">
                            Join Course
                        </Button>
                        <Button variant={"outline"}
                            className="text-[var(--addi-color-500)] font-bold border-[var(--addi-color-500)] py-3 hover:bg-[var(--color-100)]">
                            Add To Card <ShoppingCart />
                        </Button>
                    </div>

                    <div>
                        <p className="flex flex-row gap-3 mb-1 text-sm items-center">
                            <Video className="text-[var(--addi-color-500)]" size={20} /> <span className="text-gray-400">24 recorded vedeo</span>
                        </p>
                        <p className="flex flex-row gap-3 mb-1 text-sm items-center">
                            <Clock className="text-[var(--addi-color-500)]" size={20} /> <span className="text-gray-400">Full time access</span>
                        </p>
                        <p className="flex flex-row gap-3 mb-1 text-sm items-center">
                            <File className="text-[var(--addi-color-500)]" size={20} /> <span className="text-gray-400">Courses and pdfs</span>
                        </p>
                    </div>
                </div>


            </div>
            <div className="w-[80%] p-5 border border-solid border-gray-300 rounded-lg bg-[var(--color-50)]">
                <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
                    Have Any question ?
                </p>
                <p className="text-xs font-semibold mb-2">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Aperiam laboriosam
                    tempore reiciendis numquam, voluptas
                    ad placeat saepe. Vel totam provident
                    sed quidem enim quam repellendus quo
                    , dicta voluptatibus, quos molestias.
                </p>
                <Button variant={"link"} className="flex flex-row gap-2">
                    <Phone className="text-green-500"/> 0000000000
                </Button>
                <Button variant={"link"} className="flex flex-row gap-2">
                    <Mail className="text-red-500"/> example@example.example
                </Button>
            </div>
        </div>
    )
}

export default JoineCourse;