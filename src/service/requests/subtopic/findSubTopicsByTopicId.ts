import { ISubTopicFind } from 'service/@types/subtopic'
import { subTopicsMock } from 'service/mocks/subtopics'

export async function findSubTopicsByTopicId(
  id: number,
): Promise<ISubTopicFind[]> {
  return subTopicsMock.filter(
    (subTopic) => subTopic.idTopic === id,
  )
}