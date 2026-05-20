import { ITopicFind } from 'service/@types/topic'
import { topicsMock } from 'service/mocks/topics'

export async function findTopicsByModuleId(
  id: number,
): Promise<ITopicFind[]> {
  return topicsMock.filter(
    (topic) => topic.idModule === id,
  )
}