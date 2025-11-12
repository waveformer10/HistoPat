import { IconLib } from "components/IconLib/IconLib";
import { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { AccordionProps } from "./Accordion.types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter, useParams } from "next/navigation";

const accordionStyles = tv({
  slots: {
    wrapper: "flex w-full flex-col rounded-[4px] bg-white shadow-md",
    header:
      "flex w-full cursor-pointer flex-row items-center gap-2.5 px-3.5 py-3.5",
    optionsWrapper: "scrollbar-hidden relative h-36 overflow-auto px-2.5",
    virtualWrapper: "relative w-full",
    option: "option-border absolute top-0 left-0 w-full py-2 pl-1.5",
    titleStyle: `accordion-clamp-title text-[14px] leading-3.5 text-black`,
    openIconStyle: "ml-auto",
  },
});

export function Accordion({ title, items }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [titleOverflow, setTitleOverflow] = useState(false);

  const router = useRouter();
  const params = useParams();
  const moduloId = params?.moduloId;

  const {
    wrapper,
    header,
    optionsWrapper,
    virtualWrapper,
    option,
    titleStyle,
    openIconStyle,
  } = accordionStyles();

  const parentRef = useRef<HTMLDivElement>(null);

  const pRef = useRef<HTMLParagraphElement>(null);

  const columnVirtualizer = useVirtualizer({
    count: items.length,
    estimateSize: () => 32,
    getScrollElement: () => parentRef.current,
    paddingEnd: 30,
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  function handleOpenClose() {
    setIsOpen((prev) => !prev);
  }

  function handleNavigate(subtopicoId: number) {
    if (!moduloId) return console.warn("módulo não encontrado na URL");
    router.push(`/home/modulo/${moduloId}/subtopico/${subtopicoId}`);
  }

  useEffect(() => {
    if (pRef.current) {
      const element = pRef.current;
      const style = window.getComputedStyle(element);

      const lineHeight = parseFloat(style.lineHeight);
      const height = element.clientHeight;

      const lines = Math.round(height / lineHeight);

      if (lines > 3) setTitleOverflow(true);
    }
  }, []);

  return (
    <div className={wrapper()}>
      <div className={header()} onClick={handleOpenClose}>
        <p ref={pRef} className={titleStyle()}>
          {title.toUpperCase()}
        </p>
        <div
          className={openIconStyle()}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          <IconLib
            iconLibName="io"
            icon={"IoIosArrowDown"}
            color="var(--color-gray-500)"
            size={25}
          />
        </div>
      </div>
      {isOpen && (
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
                  data-index={virtualItem.index}
                  ref={columnVirtualizer.measureElement}
                  style={{
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <p
                    className={`${titleStyle()} cursor-pointer hover:text-[#26406C] transition-colors`}
                    onClick={() => handleNavigate(item.id)}
                  >
                    {item.title}
                  </p>

                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
