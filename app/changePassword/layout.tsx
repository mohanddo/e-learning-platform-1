import Header from "@/components/layout/header";

export default function ChangePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section className="flex justify-center mt-30">{children}</section>
    </>
  );
}
