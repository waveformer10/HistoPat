"use client";

import { useState, useEffect, useRef } from "react";
import { tv } from "tailwind-variants";

import { SideBarProps } from "./SideBar.types";
import { IconSvg } from "components/IconSvg/IconSvg";

const sideBarStyles = tv({
  base: "flex h-screen min-w-24 flex-col transition-all duration-200 ease-in-out overflow-x-auto",
  variants: {
    color: {
      primary: "bg-(--primary-default)",
      secondary: "bg-(--neutral-white)",
    },
    widthVariant: {
      true: "w-[20%]",
      false: "w-[30%]",
    },
    overlay: {
      true: "fixed top-0 left-0 z-50 h-full transform shadow-xl transition-transform",
      false: "relative",
    },
    hidden: {
      true: "translate-x-full",
      false: "translate-x-0",
    },
  },
});

export function SideBar({
  children,
  image,
  collapsible = false,
  colorNavigation = "primary",
  title = "",
  colorText = "black",
}: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [hidden, setHidden] = useState(false);

  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sideBarRef.current;
    if (!el) return;

    const handleWheel = (e: any) => {

      const hasVertical = el.scrollHeight > el.clientHeight;
      const hasHorizontal = el.scrollWidth > el.clientWidth;

      if (hasVertical && hasHorizontal) return;

      if (hasHorizontal && !hasVertical) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 0.3;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (!collapsible) return;
    const resize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const smallScreen = aspectRatio < 1;
      setOverlay(smallScreen);
      if (collapsed && smallScreen) setCollapsed(false);
      if (!smallScreen) setHidden(false);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [collapsible, overlay]);

  function collapseAction() {
    if (!collapsible) return;

    setHidden((prev) => !prev);

  }

  return (
    <>
      {overlay && (
        <button
          onClick={collapseAction}
          className="fixed top-4 left-4 z-[60] rounded-lg bg-(--primary-default) !p-2 text-white shadow-lg hover:cursor-pointer"
        >
          <IconSvg icon="menu_icon" size="lg" />
        </button>
      )}
      {!hidden && (
        <nav
          className={sideBarStyles({
            color: colorNavigation,
            widthVariant: collapsible,
            overlay: collapsible ? overlay : false,
            hidden: collapsible ? hidden : false,
          })}
        >
          <div className="sticky top-0 z-10 bg-inherit">
            {image && (
              <div className="flex h-40 w-full items-center justify-center">
                <img
                  src={image}
                  alt="Logo"
                  className="h-25/100 w-80/100 object-contain"
                />
              </div>
            )}
            {title && (
              <p
                className={`px-5 py-6 text-${colorText} text-[20px] font-normal`}
              >
                {title}
              </p>
            )}
          </div>
          <div className="flex h-full w-full flex-col overflow-auto bg-inherit custom-scrollbar" ref={sideBarRef}>
            {children}
          </div>
        </nav>
      )}
      {collapsible && overlay && !hidden && (
        <div
          className="fixed inset-0 z-40 bg-(--neutral-black)/80"
          onClick={() => setHidden(true)}
        />
      )}
    </>
  );
}