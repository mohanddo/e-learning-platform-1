import Header from "@/components/layout/header";

export default function CartLayout({
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
