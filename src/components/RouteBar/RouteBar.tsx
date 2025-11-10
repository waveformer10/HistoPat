"use client";

import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { RouteBarProps } from "./RouteBar.types";

const routeBarStyles = tv({
  base: `
    w-full
    bg-(--primary-default)
    text-white
    h-45
    px-8
    shadow-sm
    flex items-center justify-between
    fixed top-24
    z-20
    transition-transform duration-300 ease-in-out
  `,
  variants: {
    hidden: {
      true: "-translate-y-full",
      false: "translate-y-0",
    },
  },
});

const textContainerStyles = tv({
  base: `
    flex flex-col justify-center
  `,
});

const routeTextStyles = tv({
  base: `
    text-sm text-(--neutral-200)
  `,
});

const titleTextStyles = tv({
  base: `
    text-2xl font-semibold leading-tight
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
  }, [scroll]);

  return (
    <div className={routeBarStyles({ hidden })}>
      <div className={textContainerStyles()}>
        <p className={routeTextStyles()}>{routeText}</p>
        <h1 className={titleTextStyles()}>{title}</h1>
      </div>
    </div>
  );
};
