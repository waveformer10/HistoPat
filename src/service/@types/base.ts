export interface IBaseEntity {
  title: string;
  description: string;
  active: boolean;
  createdAt: string;
  lastModified?: string;
  imageUrl?: string;
}
