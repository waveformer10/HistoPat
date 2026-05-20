// src/service/requests/subtopic/findSubTopicById.ts
import { subTopicsMock } from "service/mocks/subtopics";
import { ISubTopicFind } from "service/@types/subtopic";

export async function findSubTopicById(id: number): Promise<ISubTopicFind | null> {
  return subTopicsMock.find((subTopic) => subTopic.id === id) ?? null;
}