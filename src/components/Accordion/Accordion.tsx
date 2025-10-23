import { IconLib } from "components/IconLib/IconLib";
import { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { AccordionProps } from "./Accordion.types";
import { useVirtualizer } from "@tanstack/react-virtual";

const accordionStyles = tv({
  slots: {
    wrapper: "flex w-full flex-col rounded-[4px] bg-white",
    header:
      "flex w-full flex-row items-center gap-2.5 px-3.5 py-3.5 cursor-pointer",
    optionsWrapper: "scrollbar-hidden relative h-36 overflow-auto px-2.5",
    virtualWrapper: "relative w-full",
    option: "option-border absolute top-0 left-0 h-8 w-full py-1 pl-1.5",
    titleStyle: "text-[14px] text-black",
    openIconStyle: "ml-auto"
  },
});

export function Accordion({ title, items }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [titleOverflow, setTitleOverflow] = useState(false);
  
  const {
    wrapper,
    header,
    optionsWrapper,
    virtualWrapper,
    option,
    titleStyle,
    openIconStyle
  } = accordionStyles();

  const parentRef = useRef<HTMLDivElement>(null);

  const pRef = useRef<HTMLParagraphElement>(null);

  const columnVirtualizer = useVirtualizer({
    count: items.length,
    estimateSize: () => 32,
    getScrollElement: () => parentRef.current,
  });

  useEffect(() => {
    if (pRef.current) {
      const element = pRef.current;
      const style = window.getComputedStyle(element);

      const lineHeight = parseFloat(style.lineHeight);
      const height = element.clientHeight;

      const lines = Math.round(height / lineHeight);
      
      if(lines > 3) setTitleOverflow(true);
    }
  }, []);

  return (
    <div className={wrapper()}>
      <div className={header()}>
        <p ref={pRef} className={titleStyle()} style={{display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden"}}>
          {title.toUpperCase()}
        </p>
        <div className={openIconStyle()}>
          <IconLib
            iconLibName="io"
            icon={isOpen ? "IoIosArrowUp" : "IoIosArrowDown"}
            color="var(--color-gray-500)"
            size={25}
          />
        </div>
      </div>
      <div className={optionsWrapper()} ref={parentRef}>
        <div
          className={virtualWrapper()}
          style={{ height: columnVirtualizer.getTotalSize() }}
        >
          {columnVirtualizer.getVirtualItems().map((virtualItem) => {
            const item = items[virtualItem.index];

            return (
              <div
                className={option()}
                key={virtualItem.key}
                ref={columnVirtualizer.measureElement}
                style={{ transform: `translateY(${virtualItem.start}px)` }}
              >
                <p className={titleStyle()}>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
