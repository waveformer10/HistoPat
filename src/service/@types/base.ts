export interface IBaseEntity {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface IBaseEntitySave {
  idParentEntity: number
}

export interface IBasePartialEntity {
  id: number;
  title: string;
}

export interface IBaseEntityGet {
  id: number;
  createdAt: string;
  lastModified?: string;
  active: boolean;
}
