import { Button } from "../ui/button";
import {
  ShoppingCart,
  Video,
  Clock,
  File,
  Phone,
  Mail,
  Play,
} from "lucide-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";

const JoinCourse = ({ role }: { role: string }) => {
  return (
    <div className="flex-2 flex-col flex pt-28 pb-28 pl-28 items-center w-full max-w-xl mx-auto">
      <div className="flex flex-col justify-center shadow-lg  mb-5">
        <div className="mb-5 relative flex items-center justify-center h-72 w-full">
          <Image
            src="/exmp1.jpg"
            alt="image non disponible"
            fill
            className="rounded-t-xl brightness-50 object-cover"
          />
          <Button className="absolute flex items-center justify-center w-13 h-13 rounded-full bg-white text-lg">
            <Play className="text-[var(--addi-color-500)] " />
          </Button>
        </div>

        <div className="pb-5 pr-5 pl-5">
          <div className="w-full flex items-center gap-2 py-2">
            <p className="text-lg font-bold text-gray-900">Price:</p>
            {true ? (
              <span className="flex items-baseline gap-2">
                <span className="text-gray-900 text-lg font-bold">
                  {6000} DA
                </span>
                <span className="text-gray-400 text-sm font-semibold line-through">
                  {7500} DA
                </span>
              </span>
            ) : (
              <span className="text-lg font-bold text-gray-900">{6000} DA</span>
            )}
          </div>

          <div className=" flex flex-col mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant={"outline"}
                className="text-[var(--addi-color-500)] font-bold border-[var(--addi-color-500)] py-3 hover:bg-[var(--color-100)] flex-1"
              >
                Add To Card <ShoppingCart />
              </Button>
              <Button
                variant="outline"
                className="border-[var(--addi-color-500)] font-bold py-3 hover:bg-[var(--color-100)] flex items-center justify-center gap-2"
              >
                <FavoriteIcon className="text-[var(--addi-color-500)]" />
              </Button>
            </div>

            <Button className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white text-md font-semibold">
              Join Course
            </Button>
          </div>

          <div className="mb-5">
            <p className="flex flex-row gap-3 mb-1 text-sm items-center">
              <Video className="text-[var(--addi-color-500)]" size={20} />{" "}
              <span className="text-gray-400">24 recorded video</span>
            </p>
            <p className="flex flex-row gap-3 mb-1 text-sm items-center">
              <Clock className="text-[var(--addi-color-500)]" size={20} />{" "}
              <span className="text-gray-400">Full time access</span>
            </p>
            <p className="flex flex-row gap-3 mb-1 text-sm items-center">
              <File className="text-[var(--addi-color-500)]" size={20} />{" "}
              <span className="text-gray-400">Documents</span>
            </p>
          </div>

          <div className="w-full p-5 border border-solid border-gray-300 rounded-lg bg-[var(--color-50)]">
            <p className="text-xl font-bold mb-3 text-[var(--wr-color-9)]">
              Have Any question ?
            </p>
            <p className="text-xs font-semibold mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              laboriosam tempore reiciendis numquam, voluptas ad placeat saepe.
              Vel totam provident sed quidem enim quam repellendus quo , dicta
              voluptatibus, quos molestias.
            </p>
            <Button variant={"link"} className="flex flex-row gap-2">
              <Phone className="text-green-500" /> 0000000000
            </Button>
            <Button variant={"link"} className="flex flex-row gap-2">
              <Mail className="text-red-500" /> example@example.example
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCourse;
