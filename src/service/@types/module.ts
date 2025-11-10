import { IBaseEntity, IBaseEntityGet } from "./base";

export interface IModuleSave extends IBaseEntity {}

export interface IModuleEdit extends IBaseEntity {
  id: number;
}

export interface IModuleFind extends IBaseEntity, IBaseEntityGet {}
