// src/service/requests/topic/findTopicById.ts
import { topicsMock } from "service/mocks/topics";
import { ITopicFind } from "service/@types/topic";

export async function findTopicById(id: number): Promise<ITopicFind | null> {
  return topicsMock.find((topic) => topic.id === id) ?? null;
}