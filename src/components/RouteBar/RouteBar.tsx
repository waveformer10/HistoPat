"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    relative
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

export const RouteBar: React.FC<RouteBarProps & { moduleId?: number; topicId?: number }> = ({
  routeText,
  title,
  moduleId,
  topicId,
}) => {
  const [hidden, setHidden] = useState(false);
  const [scroll, setScroll] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHidden(currentScroll > scroll && currentScroll > 100);
      setScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  const handleTopicClick = () => {
    if (moduleId) {
      router.push(`/home/modulo/${moduleId}`);
    }
  };

  return (
    <div className={routeBarStyles({ hidden })}>
      <div className={textContainerStyles()}>
        <p className={routeTextStyles()}>
          {routeText.split("/").map((part, index) => {
            // index 1 é o tópico
            if (index === 1 && moduleId) {
              return (
                <span
                  key={index}
                  onClick={handleTopicClick}
                  className="cursor-pointer hover:text-white transition-colors duration-200"
                >
                  {part}
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </p>
        <h1 className={titleTextStyles()}>{title}</h1>
      </div>
    </div>
  );
};
