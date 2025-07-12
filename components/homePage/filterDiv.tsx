"use client";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useAppContext } from "../../context/context";
import { useFilteredCourses } from "../../context/FilteredCoursesContext";

const categories: { id: number; name: string }[] = [
  { id: 1, name: "Math" },
  { id: 2, name: "Science" },
  { id: 3, name: "History" },
  { id: 4, name: "Language" },
  { id: 5, name: "Programming" },
  { id: 6, name: "Physics" },
];

const FilterDiv = () => {
  const { courses } = useAppContext();
  const {
    filterCourses,
    currentCategory,
    setCurrentCategory,
    currentCourseName,
    setCurrentCourseName,
  } = useFilteredCourses();

  const [startIndex, setStartIndex] = useState<number>(0);
  const categoriesPerPage = 5;

  const currentSet: { id: number; name: string }[] = categories.slice(
    startIndex,
    startIndex + categoriesPerPage
  );

  const handelNext = () => {
    const nextIndex = startIndex + 1;
    return nextIndex < categories.length
      ? setStartIndex(nextIndex)
      : setStartIndex(categories.length - categoriesPerPage);
  };

  const handelPrev = () => {
    const prevIndex = startIndex - 1;
    return prevIndex >= 0 ? setStartIndex(prevIndex) : setStartIndex(0);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row h-[10vh] items-center justify-center mb-6 mt-6">
        <div className="flex-1 flex justify-start pl-32">
          <p className="text-3xl font-bold flex">
            Our{" "}
            <span className="ml-2 text-[var(--addi-color-500)]"> Courses</span>
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="border-1 border-solid border-gray-400 flex flex-row items-center px-1 py-1 w-auto rounded-lg">
            <input
              type="text"
              placeholder="Search for a course"
              className="focus:outline-none focus:ring-0 focus:border-transparent w-md ml-2"
              onChange={(e) => {
                filterCourses(courses, currentCategory, e.target.value);
                setCurrentCourseName(e.target.value);
              }}
            />
            <button className="cursor-pointer px-1.5 rounded-lg py-1.5 bg-[var(--color-100)] text-[var(--color-400)] hover:text-[var(--addi-color-500)]">
              <Search />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mb-8 flex items-center justify-center">
        <div className="w-[70%] h-20 px-5 flex flex-row justify-center items-center border border-solid border-gray-300 rounded-lg bg-[var(--color-50)]">
          <div className="flex-[0.2] h-full flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-[var(--color-100)] disabled:bg-gray-300"
              onClick={handelPrev}
              disabled={startIndex === 0}
            >
              <ChevronLeft />
            </Button>
          </div>

          <div className="flex-[4] flex flex-row flex-wrap items-center justify-around">
            {currentSet.map((ca) => (
              <Button
                key={ca.id}
                variant="outline"
                className={`w-32 border-gray-300 hover:text-[var(--addi-color-500)] 
                                                hover:border-[var(--addi-color-500)] hover:font-semibold 
                                                ${
                                                  ca.name === currentCategory
                                                    ? "text-[var(--addi-color-500)]  border-[var(--addi-color-500)] font-semibold"
                                                    : ""
                                                }`}
                onClick={() => {
                  if (ca.name === currentCategory) {
                    setCurrentCategory("All");
                    filterCourses(courses, "All", currentCourseName);
                  } else {
                    setCurrentCategory(ca.name);
                    filterCourses(courses, ca.name, currentCourseName);
                  }
                }}
              >
                {ca.name}
              </Button>
            ))}
          </div>

          <div className="flex-[0.2] h-full flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-[var(--color-100)] disabled:bg-gray-300"
              onClick={handelNext}
              disabled={startIndex + categoriesPerPage === categories.length}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDiv;
