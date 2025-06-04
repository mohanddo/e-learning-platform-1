import Header from "@/components/layout/header";

export default function TeacherLayout({
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
