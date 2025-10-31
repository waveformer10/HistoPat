import { subTopic } from "./subTopic";

export interface topic {
  id: number;
  idModule: number;
  title: string;
  active: boolean;
  createdAt: string;
  lastModified?: string;
  subTopics?: subTopic[];
}
