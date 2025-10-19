import * as icons from "./svgs/_index";

export type IconSvgName = keyof typeof icons;

export type IconSvgProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: IconSvgName;
  color?: string;
};
