"use client";

import { tv } from "tailwind-variants";
import { useEffect, useState } from "react";
import { IconSvg } from "components/IconSvg/IconSvg";
import { SideBar } from "components/SideBar/SideBar";

const navbarStyles = tv({
  base: `
    fixed top-0 left-0 w-full
    flex items-center justify-between
    bg-(--primary-extra-light) text-black
    h-30 px-1 shadow-md
    z-30
  `,
});

const logoStyles = tv({
  base: "text-lg font-semibold select-none pl-10",
});

const itemContainerStyles = tv({
  base: "hidden md:flex gap-20 text-xl pr-30",
});

const itemStyles = tv({
  base: `
    cursor-pointer select-none
    transition-colors duration-150
    hover:text-(--primary-light)
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
            src="/images/logos.png"
            alt="logo"
            className="h-full object-contain"
          />
        </div>
        {/* ainda preciso colocar as rotas */}
        <div className={itemContainerStyles()}>
          <a className={itemStyles()} href="#">Início</a>
          <a className={itemStyles()} href="#">Log in</a>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-(--primary-light)"
        >
          <IconSvg icon="menu_icon" size="lg" />
        </button>
      </nav>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* preciso editar a sidebar dps pra ficar branca tb */}
      {sidebarOpen && (
        <SideBar
          collapsible
          colorNavigation="primary"
          title="Menu"
          showToggleButton={false}
        >
          <a className={itemStyles()} href="#">Início</a>
          <a className={itemStyles()} href="#">Log in</a>
        </SideBar>
      )}
    </>
  );
}
