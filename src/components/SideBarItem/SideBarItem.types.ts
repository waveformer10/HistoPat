import { IconName } from "../Icon/Icon.types";

export type SideBarItemProps = {
    selected?: boolean,
    icon?: IconName,
    title?: string,
    onClick?: () => void
}