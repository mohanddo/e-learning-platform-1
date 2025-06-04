import Home from "@/components/homePage/home";
import Header from "@/components/layout/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <Home role={"unauthenticated"} />
    </>
  );
}
