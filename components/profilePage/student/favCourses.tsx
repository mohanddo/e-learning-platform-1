import ProfileImage from "@/components/ui/profile-image";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/context";
import Image from "next/image";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

const FavoritCouses = () => {
  const { student } = useAppContext();

  const router = useRouter();
  const goToPage = (id: number) => {
    router.replace(`/courseDetails/${id}`);
  };
  return (
    <div className="w-full">
      <p className="text-xl font-semibold mb-10">Favorites Courses</p>
      <AnimatedList className="w-full flex flex-col justify-center gap-5">
        {student!.courses.filter((crs) => crs.favourite).length == 0 ? (
          <div className="w-full text-center py-10">
            <p className="text-gray-500 text-lg">
              You haven&apos;t added any courses to your favorites yet.
            </p>
            <p className="text-gray-400 mt-2">
              Explore courses and add them to your favorites to see them here!
            </p>
          </div>
        ) : (
          student!.courses
            .filter((crs) => crs.favourite)
            .map((crs) => (
              <div
                className="w-[100%] flex flex-row items-center mb-2 p-5 border border-gray-200 rounded-lg hover:bg-gray-200"
                onClick={() => goToPage(crs.id)}
                key={crs.id}
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
                  <p className="flex-1 text-center">
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
        )}
      </AnimatedList>
    </div>
  );
};

export default FavoritCouses;
