"use client";

import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { RouteBarProps } from "./RouteBar.types";

const routeBarStyles = tv({
  base: `
    w-full
    bg-(--primary-default)
    text-white
    py-16 px-8
    shadow-sm
    gap-3
    flex flex-col
    justify-center
    fixed top-[120px]
    z-20
    transition-transform duration-280 ease-in-out
  `,
  variants: {
    hidden: {
      true: "-translate-y-full",
      false: "translate-y-0",
    },
  },
});

const routeTextStyles = tv({
  base: `
    text-xl text-(--neutral-200)
  `,
});

const titleTextStyles = tv({
  base: `
    text-4xl font-semibold
  `,
});

export const RouteBar: React.FC<RouteBarProps> = ({
  routeText,
  title,
}) => {
  const [hidden, setHidden] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > scroll && currentScroll > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScroll]);

  return (
    <div className={routeBarStyles({ hidden })}>
      <p className={routeTextStyles()}>{routeText}</p>
      <h1 className={titleTextStyles()}>{title}</h1>
    </div>
  );
}
