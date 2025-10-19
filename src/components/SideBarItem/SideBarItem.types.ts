import { IconName } from "../IconSvg/IconSvg.types";

export type SideBarItemProps = {
  selected?: boolean;
  icon?: IconName;
  title?: string;
  onClick?: () => void;
};
