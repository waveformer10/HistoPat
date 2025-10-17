'use client';

import { useState, useEffect } from "react";
import { tv } from "tailwind-variants";

import { SideBarProps } from "./SideBar.types";
import { Icon } from "components/Icon/Icon";

const sideBarStyles = tv({
    base: "flex flex-col h-screen min-w-12 transition-all duration-200 ease-in-out",
    variants: {
        color: {
            primary: "bg-(--primary-default)",
            secondary: "bg-(--neutral-white)"
        },
        collapse: {
            true: "w-16",
            false: "w-70 min-w-40 max-w-50/100"
        },
        overlay: {
            true: "fixed top-0 left-0 h-full shadow-xl z-50 transition-transform transform",
            false: "relative"
        },
        hidden: {
            true: "translate-x-full",
            false: "translate-x-0"
        }
    }
});

export function SideBar({
    children,
    image,
    collapsible = false,
    colorNavigation = "primary",
    title = "",
    colorText = "black"
}: SideBarProps
) {
    const [collapsed, setCollapsed] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (!collapsible) return;
        const resize = () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const smallScreen = aspectRatio < 1;
            setOverlay(smallScreen);
            if (collapsed && smallScreen) setCollapsed(false);
            if (!smallScreen) setHidden(false);
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [collapsible, overlay]);

    function collapseAction() {
        if (!collapsible) return;
        if (overlay) {
            setHidden((prev) => !prev);
        } else {
            setCollapsed((prev) => !prev);
        }
    }

    return (
        <>
            {overlay && (
                <button
                onClick={collapseAction}
                className="fixed top-4 left-4 z-[60] !p-2 bg-(--primary-default) text-white rounded-lg shadow-lg hover:cursor-pointer"
                >
                    <Icon icon="menu_icon" size="lg" />
                </button>
            )}
            {!hidden && (
                <nav
                    className={sideBarStyles({
                        color: colorNavigation,
                        collapse: collapsed,
                        overlay: collapsible ? overlay : false,
                        hidden: collapsible ? hidden : false
                    })}
                >
                    <div className="sticky top-0 z-10 bg-inherit">
                        {collapsible && !overlay && (
                            <button onClick={collapseAction} className="m-2 rounded !p-4 text-sm absolute hover:cursor-pointer">
                                <Icon
                                    size="xl"
                                    icon="menu_icon"
                                />
                            </button>
                        )}
                        {image && (
                            <div className="flex h-40 w-full items-center justify-center">
                                <img src={image} alt="Logo" className="h-25/100 w-80/100 object-contain" />
                            </div>
                        )}
                        {title && (
                            <h1 className={`!px-5 !py-8 text-${colorText} text-sm font-normal`}>{title}</h1>
                        )}
                    </div>
                    <div className="flex h-full w-full flex-col overflow-y-auto overscroll-y-contain scrollbar-hidden bg-inherit">
                        {children}
                    </div>
                </nav>
            )}
            {collapsible && overlay && !hidden && (
                <div
                className="fixed inset-0 bg-(--neutral-black)/80 z-40"
                onClick={() => setHidden(true)}
                />
            )}
        </>
    )
}