import * as icons from "./svgs/_index";

import { tv } from "tailwind-variants";

import { IconProps } from "./Icon.types";

const iconStyles = tv({
    variants: {
        size: {
            xs: "size-3",
            sm: "size-4",
            md: "size-6",
            lg: "size-7",
            xl: "size-8"
        }
    }
});

export function Icon({
    size = "md",
    icon = undefined,
    color = "white"
} : IconProps
){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconStyles({ 
                size: size
             })}
            style={{ color: color }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            {icons[icon || "default_icon"]()}
        </svg>
    );
};