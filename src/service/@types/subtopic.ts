import { IBaseEntity, IBaseEntityGet } from "./base";

export interface ISubTopicSave extends IBaseEntity {}
export interface ISubTopicEdit extends IBaseEntity {
  id: number;
}

export interface ISubTopicFind extends IBaseEntity, IBaseEntityGet {}
