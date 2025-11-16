import { IBaseEntity, IBaseEntityGet, IBaseEntitySave, IBasePartialEntity } from "./base";

export interface ITopicSave
  extends Omit<IBaseEntity, "imageUrl" | "description">, IBaseEntitySave { }
export interface ITopicEdit
  extends Omit<IBaseEntity, "imageUrl" | "description"> {
  id: number;
}

export interface ITopicFind
  extends Omit<IBaseEntity, "imageUrl" | "description">,
  IBaseEntityGet { }
