import Image from "next/image";
import FirstSection from "../components/homePage/firstSection";
import FilterDiv from "../components/homePage/filterDiv";
export default function Home() {
  return (
    <section className="flex flex-col">
      <FirstSection/>
      <FilterDiv />
      
    </section>
  );
}
