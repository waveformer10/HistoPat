"use client";

import {
  useState,
  ReactNode,
  Children,
  isValidElement,
  useEffect,
  useRef,
} from "react";
import { tv } from "tailwind-variants";
import { ContentTreeItemProps } from "./ContentTreeItem.types";
import { IconSvg } from "components/IconSvg/IconSvg";

const treeItemStyles = tv({
  base: "flex w-full flex-wrap gap-1 text-sm select-none",
});

const itemRowStyles = tv({
  base: `flex cursor-pointer flex-wrap items-center rounded-md transition-colors duration-200`,
});

const itemRowContentStyles = tv({
  base: `flex items-center gap-2 rounded-md !px-1 !py-[1px] hover:bg-(--neutral-100) relative`,
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
  parentPath,
  globalDepth,
  onAddClick,
}: ContentTreeItemProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(defaultOpen);
  const [adjustedDepth, setAdjustedDepth] = useState(depth);
  const [paddingLeft, setPaddingLeft] = useState(`${depth * 1.75}rem`);
  const [basePx, setBasePx] = useState(0);

  const renderedChildren: ReactNode[] = [];
  const hasObjectChildren = Array.isArray(children) && children.length > 0;

  if (hasObjectChildren) {
    children.forEach((child, index) => {
      renderedChildren.push(
        <ContentTreeItem
          key={index}
          {...child}
          depth={depth + 1}
          globalDepth={adjustedDepth}
          onSelect={onSelect}
          selectedTitle={selectedTitle}
          parentPath={`${(parentPath ?? "HistoPat")}\\${title}`}
          onAddClick={onAddClick}
        />,
      );
    });
  }

  const hasChildren = renderedChildren.length > 0;
  const isSelected = selectedTitle === `${(parentPath ?? "HistoPat")}\\${title}`;
  
  useEffect(() => {
    const ajustarHierarquia = () => {
      const parent = parentRef.current;
      if (!parent) return;

      const parentWidth = parent.offsetWidth;

      const elements = Array.from(parent.children) as HTMLElement[];

      if (elements.length === 0) return;

      const aspectRatio = window.innerWidth / window.innerHeight;
      const smallScreen = aspectRatio < 1;

      if (smallScreen) {
        setAdjustedDepth(0);
        setPaddingLeft("0rem");
        setBasePx(0);
        return;
      }

      const totalWidth = Math.max(
        ...elements.map((el) => el.offsetLeft + el.offsetWidth)
      );

      const ratio = totalWidth > parentWidth ? parentWidth / totalWidth : 1;
      const minRatio = Math.max(ratio, 0.1);

      const newDepth = (globalDepth ?? depth) * minRatio;

      const basePadding = 1.75 * minRatio;
      const offset = hasChildren ? 0 : 1.25 * minRatio;

      const finalPadding = newDepth * basePadding + offset;

      setAdjustedDepth(newDepth);
      setPaddingLeft(`${finalPadding}rem`);
      setBasePx(2 * minRatio);
    };

    ajustarHierarquia();
    window.addEventListener("resize", ajustarHierarquia);
    return () => window.removeEventListener("resize", ajustarHierarquia);
  }, [depth, hasChildren, globalDepth]);


  const pathItem = `${(parentPath ?? "HistoPat")}\\${title}`;

  const clickAction = () => {
    if (hasChildren) setOpen((prev) => !prev);
    if (onSelect) onSelect(pathItem);
  };

  return (
    <div className={treeItemStyles()} style={{paddingLeft: `${basePx / 2}rem`, paddingRight: `${basePx / 2}rem`}} ref={parentRef}>
      <div
        className={itemRowStyles()}
        style={{ paddingLeft }}
        onClick={clickAction}
      >
        {hasChildren && (
          <div
            className={`relative flex h-5 w-5 items-center justify-center`}
          >
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
                if (onAddClick) onAddClick();
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
