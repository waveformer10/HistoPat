import {
  IBaseEntity,
  IBaseEntityGet,
  IBaseEntitySave,
} from './base'

export interface ISubTopicSave
  extends IBaseEntity,
    IBaseEntitySave {}

export interface ISubTopicEdit extends IBaseEntity {
  id: number
}

export interface ISubTopicFind
  extends IBaseEntity,
    IBaseEntityGet {
  idTopic?: number
}