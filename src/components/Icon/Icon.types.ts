import * as icons from "./svgs/_index";

export type IconName = keyof typeof icons;

export type IconProps = {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    icon?: IconName
    color?: string
}