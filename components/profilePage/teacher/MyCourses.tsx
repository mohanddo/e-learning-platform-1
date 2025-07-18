"use client";

import ProfileImage from "@/components/ui/profile-image";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppContext } from "@/context/context";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

const MyCourses = () => {
  const { teacher } = useAppContext();

  const router = useRouter();
  const goToPage = (id: number) => {
    router.replace(`/courseDetails/${id}`);
  };

  const goToCreateCourse = () => {
    router.push("/teacher/createCourse");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10">
        <p className="text-xl font-semibold">Your Courses</p>
        <Button
          onClick={goToCreateCourse}
          className="bg-[var(--addi-color-500)] text-white font-bold hover:bg-[var(--addi-color-400)] flex items-center gap-2"
        >
          <Plus size={16} />
          Create New Course
        </Button>
      </div>
      <AnimatedList className="w-full flex flex-col justify-center gap-5">
        {teacher!.courses.length != 0 ? (
          teacher!.courses.map((crs) => (
            <div
              key={crs.id}
              className="w-[100%] flex flex-row items-center mb-2 p-5 border border-gray-200 rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => goToPage(crs.id)}
            >
              <Image
                src={crs.imageUrl || ""}
                alt={crs.title}
                width={100}
                height={100}
                className="mr-10"
              />
              <div className="flex-1 mr-10 max-w-[45%]">
                <p className="font-semibold mb-2 truncate" title={crs.title}>
                  {crs.title}
                </p>
                <p>{crs.category}</p>
              </div>
              <div className="flex-1 flex flex-row gap-5">
                <p className="flex-1">
                  {crs.teacher.firstName + " " + crs.teacher.lastName}
                </p>

                <ProfileImage
                  src={`${profilePicsEndPoint}/${crs.teacher.id}?${crs.teacher.sasTokenForReadingProfilePic}`}
                  firstName={crs.teacher.firstName}
                  lastName={crs.teacher.lastName}
                  className="mr-2"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-10">
            <p className="text-gray-500 text-lg">
              You haven&apos;t created any courses yet.
            </p>
            <p className="text-gray-400 mt-2 mb-6">
              Create a course to see it here!
            </p>
          </div>
        )}
      </AnimatedList>
    </div>
  );
};

export default MyCourses;
