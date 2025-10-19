import { IconName } from "../IconSvg/IconSvg.types";
import { ReactNode } from "react";

export type ContentTreeItemProps = {
  title: string;
  icon?: IconName;
  defaultOpen?: boolean;
  depth?: number;
  onSelect?: (title: string) => void;
  selectedTitle?: string;
  allowAddButton?: boolean;
  children?: ContentTreeItemProps[];
  jsxChildren?: ReactNode;
};
