import { EntityType } from "components/Form/Form.types";
import { IconSvgName } from "../IconSvg/IconSvg.types";
import { ReactNode } from "react";
import { IModuleFind } from "service/@types/module";
import { ITopicFind } from "service/@types/topic";
import { ISubTopicFind } from "service/@types/subtopic";
import { ISlideFind } from "service/@types/slide";
import { SelectedEntityType } from "store/appState";

export type AllEntityFindTypes = IModuleFind & ITopicFind & ISubTopicFind & ISlideFind;

export const entityTypeIconEnum: Record<EntityType, IconSvgName> = {
  MODULE: "folder_icon",
  TOPIC: "list_icon",
  SUBTOPIC: "collection_icon",
  SLIDE: "file_icon"
}

export const nextEntityType: Record<EntityType, EntityType> = {
  MODULE: "TOPIC",
  TOPIC: "SUBTOPIC",
  SUBTOPIC: "SLIDE",
  SLIDE: "SLIDE"
}

export type ContentTreeItemProps = {
  defaultOpen?: boolean;
  depth?: number;
  entityType: EntityType;
  entityData: AllEntityFindTypes;
  allowAddButton?: boolean;
  jsxChildren?: ReactNode;
  parentPath: string;
  parentId?: number;
  parentEntityType?: EntityType;
};
