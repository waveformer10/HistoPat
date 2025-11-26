"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "components/layout/Navbar/Navbar";
import { Footer } from "components/layout/Footer/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noLayoutRoutes = [
    "/Login",
    "/HomeAdm",
    "/PageExample",
    "/Usuarios",
    "/Usuarios/Novo",
    "/Usuarios/Editar",
  ];

  const ignore =
    noLayoutRoutes.includes(pathname) || pathname.startsWith("/Usuarios/");

  if (ignore) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="bg-(--primary-extra-lighter) flex-1 pt-24 pb-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
