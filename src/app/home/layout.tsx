import "../globals.css";
import { Navbar } from "components/layout/Navbar/Navbar";
import { Footer } from "components/layout/Footer/Footer";

export const metadata = {
  title: "HistoPat",
  description: "Atlas de histologia",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
