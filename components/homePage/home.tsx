import FilterDiv from "./filterDiv";
import FirstSection from "./firstSection";
import HomePageCourses from "./homePageCourses";
import Join from "./lastSection";

export default function Home() {
  return (
    <section className="flex flex-col">
      <FirstSection />
      <FilterDiv />
      <HomePageCourses />
      <Join />
    </section>
  );
}
