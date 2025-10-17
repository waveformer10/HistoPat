'use client';

import { useState, useRef, useEffect } from "react";
import { tv } from "tailwind-variants";

import { SideBarItemProps } from "./SideBarItem.types";
import { Icon } from "components/Icon/Icon";

const sideBarItemStyles = tv({
    base: `flex flex-row w-full h-10
        items-center justify-start
        bg-(--primary-default)
        hover:bg-(--neutral-white)/20
        hover:cursor-pointer
        !px-5
        overflow-hidden`,
    variants: {
        selected: {
            true: "bg-(--neutral-white)/40 border-l-2 border-(--secondary-default) hover:bg-(--neutral-white)/40",
            false: ""
        }
    }
});

export function SideBarItem({
    selected = false,
    icon = "default_icon",
    title = "",
    onClick = undefined
}: SideBarItemProps
) {

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
                selected: isSelected
            })}

            onClick={() => {
                selectItem();
                onClick?.();
            }}
        >
            {icon && (
                <div className="w-6 h-6 flex items-center justify-center">
                    <Icon
                        size="md"
                        icon={icon}
                        color="white"
                    />
                </div>
            )}
            {!hideText && title && (
                <span className="whitespace-nowrap overflow-hidden text-left text-(--neutral-white) !px-2">
                    {title}
                </span>
            )}
            
        </button>
    );
}