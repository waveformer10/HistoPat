import {
  IBaseEntity,
  IBaseEntityGet,
  IBaseEntitySave,
} from './base'

export interface ISlideSave
  extends IBaseEntity,
    IBaseEntitySave {}

export interface ISlideEdit extends IBaseEntity {
  id: number
}

export interface ISlideFind
  extends IBaseEntity,
    IBaseEntityGet {
  idSubTopic?: number
}