"use client";

import { tv } from "tailwind-variants";
import { useEffect, useState } from "react";
import { IconSvg } from "components/IconSvg/IconSvg";
import { SideBar } from "components/SideBar/SideBar";

const navbarStyles = tv({
  base: `
    fixed top-0 left-0 w-full
    flex items-center justify-between
    bg-white text-black
    h-24 px-6 shadow-md
    z-30
  `,
});

const logoStyles = tv({
  base: "flex items-center select-none",
});

const itemContainerStyles = tv({
  base: "hidden md:flex gap-20 text-xl pr-30",
});

const itemStyles = tv({
  base: `
    cursor-pointer select-none
    transition-colors duration-150
    hover:text-(--primary-light)
    text-sm font-semibold
  `,
});

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  return (
    <>
      <nav className={navbarStyles()}>
        <div className={logoStyles()}>
          <img
            src="/images/logo_unipam.png"
            alt="logo"
            className="h-8 md:h-10 w-auto object-contain ml-6"
          />
        </div>

        <div className={itemContainerStyles()}>
          <a className={itemStyles()} href="#">Início</a>
          <a className={itemStyles()} href="/Login">Log in</a>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-(--primary-light)"
        >
          <IconSvg icon="menu_icon" size="lg" color="var(--primary-default)" />
        </button>
      </nav>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {sidebarOpen && (
        <SideBar
          collapsible
          colorNavigation="primary"
          title="Menu"
        >
          <a className={itemStyles()} href="#">Início</a>
          <a className={itemStyles()} href="#">Log in</a>
        </SideBar>
      )}
    </>
  );
}