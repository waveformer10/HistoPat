"use client";

import {
  useState,
  ReactNode,
  Children,
  isValidElement,
  useEffect,
} from "react";
import { tv } from "tailwind-variants";
import { ContentTreeItemProps } from "./ContentTreeItem.types";
import { IconSvg } from "components/IconSvg/IconSvg";

const treeItemStyles = tv({
  base: "flex w-full flex-col gap-1 !px-2 text-sm select-none",
});

const itemRowStyles = tv({
  base: `flex cursor-pointer flex-wrap items-center rounded-md transition-colors duration-200`,
});

const itemRowContentStyles = tv({
  base: `relative flex items-center gap-2 rounded-md !px-1 !py-[1px] hover:bg-(--neutral-100)`,
  variants: {
    selected: {
      true: "bg-(--neutral-200)",
      false: "",
    },
  },
});

export function ContentTreeItem({
  title,
  icon = "default_icon",
  children = [],
  depth = 0,
  defaultOpen = false,
  onSelect,
  selectedTitle,
  allowAddButton = false,
  jsxChildren,
}: ContentTreeItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [paddingLeft, setPaddingLeft] = useState(`${depth * 1.75}rem`);

  const renderedChildren: ReactNode[] = [];
  const hasObjectChildren = Array.isArray(children) && children.length > 0;

  if (hasObjectChildren) {
    children.forEach((child, index) => {
      renderedChildren.push(
        <ContentTreeItem
          key={index}
          {...child}
          depth={depth + 1}
          onSelect={onSelect}
          selectedTitle={selectedTitle}
        />,
      );
    });
  }

  const hasChildren = renderedChildren.length > 0;
  const isSelected = selectedTitle === title;

  useEffect(() => {
    const resize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const smallScreen = aspectRatio < 1;

      const basePadding = smallScreen ? 0 : 1.75;
      const offset = hasChildren ? 0 : 1.25;
      setPaddingLeft(`${depth * basePadding + offset}rem`);
    };
    console.log("EXECUTOU RESIZE");

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [depth, hasChildren]);

  const clickAction = () => {
    if (hasChildren) setOpen((prev) => !prev);
    if (onSelect) onSelect(title);
  };

  return (
    <div className={treeItemStyles()}>
      <div
        className={itemRowStyles()}
        style={{ paddingLeft }}
        onClick={clickAction}
      >
        {hasChildren && (
          <div className={`relative flex h-5 w-5 items-center justify-center`}>
            <div
              className={`transition-transform duration-200 ${
                open ? "rotate-90" : ""
              }`}
            >
              <IconSvg size="sm" icon="arrow_icon" color="black" />
            </div>
          </div>
        )}

        <div className={itemRowContentStyles({ selected: isSelected })}>
          <IconSvg icon={icon} color="black" />
          <span className="font-medium text-(--neutral-800)">{title}</span>
          {allowAddButton && (
            <button
              className="ml-auto flex aspect-square h-5 items-center justify-center rounded bg-(--primary-default) text-(--neutral-white)"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Adicionar dentro de ${title}`);
              }}
            >
              <IconSvg size="xs" icon="plus_icon" color="white" />
            </button>
          )}
        </div>
      </div>

      {open && hasChildren && (
        <div className="mt-1 flex flex-col">{renderedChildren}</div>
      )}
    </div>
  );
}
