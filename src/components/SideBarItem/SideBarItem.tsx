"use client";

import { useState, useRef, useEffect } from "react";
import { tv } from "tailwind-variants";

import { SideBarItemProps } from "./SideBarItem.types";
import { IconSvg } from "components/IconSvg/IconSvg";

const sideBarItemStyles = tv({
  base: `flex h-10 w-full flex-row items-center justify-start overflow-hidden bg-(--primary-default) !px-5 hover:cursor-pointer hover:bg-(--neutral-white)/20`,
  variants: {
    selected: {
      true: "border-l-2 border-(--secondary-default) bg-(--neutral-white)/40 hover:bg-(--neutral-white)/40",
      false: "",
    },
  },
});

export function SideBarItem({
  selected = false,
  icon = "default_icon",
  title = "",
  onClick = undefined,
}: SideBarItemProps) {
  const [isSelected, setIsSelected] = useState(selected);
  const [hideText, setHideText] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const target = button.parentElement ?? button;

    const check = () => {
      const space = button.offsetWidth > 80;
      setHideText(!space);
    };

    check();

    const ro = new ResizeObserver(check);
    ro.observe(target);

    window.addEventListener("resize", check);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  function selectItem() {
    setIsSelected(true);
  }

  return (
    <button
      ref={buttonRef}
      className={sideBarItemStyles({
        selected: isSelected,
      })}
      onClick={() => {
        selectItem();
        onClick?.();
      }}
    >
      {icon && (
        <div className="flex h-6 w-6 items-center justify-center">
          <IconSvg size="md" icon={icon} color="white" />
        </div>
      )}
      {!hideText && title && (
        <span className="overflow-hidden !px-2 text-left whitespace-nowrap text-(--neutral-white)">
          {title}
        </span>
      )}
    </button>
  );
}
