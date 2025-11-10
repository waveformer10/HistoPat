import { IBaseEntity, IBaseEntityGet } from "./base";

export interface ITopicSave
  extends Omit<IBaseEntity, "imageUrl" | "description"> {}
export interface ITopicEdit
  extends Omit<IBaseEntity, "imageUrl" | "description"> {
  id: number;
}

export interface ITopicFind
  extends Omit<IBaseEntity, "imageUrl" | "description">,
    IBaseEntityGet {}
