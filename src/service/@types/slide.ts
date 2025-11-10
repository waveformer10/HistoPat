import { IBaseEntity, IBaseEntityGet } from "./base";

export interface ISlideSave extends IBaseEntity {}
export interface ISlideEdit extends IBaseEntity {
  id: number;
}

export interface ISlideFind extends IBaseEntity, IBaseEntityGet {}
