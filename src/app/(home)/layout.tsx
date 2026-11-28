import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer";
import MenuBar from "@/components/layout/layout/MenuBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-175 flex-col px-4 pb-24 pt-6">
        {children}
      </main>
      <MenuBar />
      <Footer />
    </>
  );
}
