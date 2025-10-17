'use client';

import { useState, ReactNode, Children, isValidElement, useEffect } from "react";
import { tv } from "tailwind-variants";
import { ContentTreeItemProps } from "./ContentTreeItem.types";
import { Icon } from "components/Icon/Icon";

const treeItemStyles = tv({
  base: "flex flex-col w-full text-sm select-none !px-2 gap-1",
});

const itemRowStyles = tv({
  base: `
    flex items-center gap-2 cursor-pointer rounded-md
    hover:bg-(--neutral-100)
    transition-colors duration-200
    flex-wrap
  `,
});

const itemRowContentStyles = tv({
  base: `
    flex items-center gap-2 rounded-md !py-[1px] !px-1
  `,
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

    useEffect(() => {
        const resize = () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const smallScreen = aspectRatio < 1;
            
            const basePadding = smallScreen ? 0 : 1.75;
            setPaddingLeft(`${depth * basePadding}rem`);
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
        }, []);

    const clickAction = () => {
        if (hasChildren) setOpen((prev) => !prev);
        if (onSelect) onSelect(title);
  };

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
        />
      );
    });
  }

  const hasChildren = renderedChildren.length > 0;
  const isSelected = selectedTitle === title;

  return (
    <div className={treeItemStyles()}>
      <div
        className={itemRowStyles()}
        style={{ paddingLeft }}
        onClick={clickAction}
      >
        <div className={`w-5 h-5 flex items-center justify-center ${hasChildren ? '' : 'hidden'}`}>
          {hasChildren && (
            <div
              className={`transition-transform duration-200 ${
                open ? "rotate-90" : ""
              }`}
            >
              <Icon size="sm" icon="arrow_icon" color="black" />
            </div>
          )}
        </div>

        <div className={itemRowContentStyles({ selected: isSelected })}>
          <Icon icon={icon} color="black" />
          <span className="font-medium text-(--neutral-800)">{title}</span>
          {allowAddButton && (
            <button
                    className="ml-auto h-5 aspect-square rounded bg-(--primary-default) flex items-center justify-center text-(--neutral-white)"
                    onClick={(e) => {
                    e.stopPropagation();
                    alert(`Adicionar dentro de ${title}`);
                    }}
                >
                    <Icon size="xs" icon="plus_icon" color="white" />
            </button>
            )}
        </div>
      </div>

      {open && hasChildren && (
        <div 
            className="flex flex-wrap mt-1"
        >{renderedChildren}</div>
      )}
    </div>
  );
}
