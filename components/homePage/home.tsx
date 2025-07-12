import FirstSection from "./firstSection";
import HomePageCourses from "./homePageCourses";
import Join from "./lastSection";
import { FilteredCoursesProvider } from "../../context/FilteredCoursesContext";

export default function Home({ role }: { role: string }) {
  return (
    <section className="flex flex-col">
      <FirstSection />
      <FilteredCoursesProvider>
        <HomePageCourses role={role} />
      </FilteredCoursesProvider>
      <Join />
    </section>
  );
}
