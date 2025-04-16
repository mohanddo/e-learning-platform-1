import FirstSection from "../components/homePage/firstSection";
import FilterDiv from "../components/homePage/filterDiv";
import HomePageCourses from "@/components/homePage/homePageCourses";
import Join from "@/components/homePage/lastSection";


export default function Home() {
  return (
    <section className="flex flex-col">
      <FirstSection/>
      <FilterDiv />
      <HomePageCourses />
      <Join />
    </section>
  );
}
