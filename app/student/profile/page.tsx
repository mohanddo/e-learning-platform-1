"use client";

import FavoritCouses from "@/components/profilePage/student/favCourses";
import PersonalData from "@/components/profilePage/student/personalData";
import PurshasesTab from "@/components/profilePage/student/purshases";
import SecPanel from "@/components/profilePage/student/secPanel";
import { useAppContext } from "@/context/context";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth/studentAuth.api";
import { LoadingState } from "@/components/profilePage/LoadingState";
import { ErrorState } from "@/components/profilePage/ErrorState";

const Profile = () => {
  const { student, setStudent } = useAppContext();
  const { status, refetch } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const data = await authApi.me();
      setStudent(data);
      console.log("data", data);
      return data;
    },
  });

  const [currentComp, setCurrentComp] = useState<string>("data");

  return (
    <section className="flex justify-center pt-[13vh]">
      <section className="w-[90%] p-5 flex flex-col gap-2.5 rounded-lg">
        <div className="mb-10">
          <span className="px-5 py-2 rounded-xl bg-blue-300 text-blue-500 border border-blue-500">
            Student
          </span>
          <p className="text-3xl font-bold mt-5">My Profile</p>
        </div>

        {status === "pending" && !student && <LoadingState />}
        {status === "error" && !student && <ErrorState refetch={refetch} />}
        {student && (
          <div className="flex flex-row gap-2">
            <div className="flex flex-col flex-[1.5] min-w-0 shadow-lg rounded-lg">
              <div className="flex flex-row border-b border-gray-300 gap-10 px-3 py-3 items-center ">
                <button
                  className={`font-semibold  ${
                    currentComp === "data"
                      ? "text-black border-b"
                      : "text-gray-400"
                  } hover:text-black`}
                  onClick={() => setCurrentComp("data")}
                >
                  Personal data
                </button>
                <button
                  className={`font-semibold  ${
                    currentComp === "pursh"
                      ? "text-black border-b"
                      : "text-gray-400"
                  } hover:text-black`}
                  onClick={() => setCurrentComp("pursh")}
                >
                  Purchases
                </button>
                <button
                  className={`font-semibold  ${
                    currentComp === "fav"
                      ? "text-black border-b"
                      : "text-gray-400"
                  } hover:text-black`}
                  onClick={() => setCurrentComp("fav")}
                >
                  Favorites
                </button>
              </div>
              <div className="py-5 px-5">
                {currentComp === "data" && <PersonalData />}
                {currentComp === "pursh" && <PurshasesTab />}
                {currentComp === "fav" && <FavoritCouses />}
              </div>
            </div>

            <div className="flex-1 min-w-[300px] self-start flex flex-col items-center py-10">
              <SecPanel />
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default Profile;
