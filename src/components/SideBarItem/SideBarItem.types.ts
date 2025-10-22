import { IconSvgName } from "../IconSvg/IconSvg.types";

export type SideBarItemProps = {
  selected?: boolean;
  icon?: IconSvgName;
  title?: string;
  onClick?: () => void;
};
