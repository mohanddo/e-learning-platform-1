import Header from "@/components/layout/header";

export default function CourseDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <>{children}</>
    </>
  );
}
