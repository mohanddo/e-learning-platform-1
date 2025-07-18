export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100 pt-20">
      {children}
    </section>
  );
}
