import "../globals.css";
import { Navbar } from "components/layout/Navbar/Navbar";
import { Footer } from "components/layout/Footer/Footer";

export const metadata = {
  title: "HistoPat",
  description: "Atlas de histologia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
