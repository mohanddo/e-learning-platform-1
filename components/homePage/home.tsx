import FirstSection from "./firstSection";
import HomePageCourses from "./homePageCourses";
import Join from "./lastSection";

export default function Home({ role }: { role: string }) {
  return (
    <section className="flex flex-col">
      <FirstSection />
      <HomePageCourses role={role} />
      <Join />
    </section>
  );
}
