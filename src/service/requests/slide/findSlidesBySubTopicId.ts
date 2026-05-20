import { slidesMock } from 'service/mocks/slides'

export async function findSlidesBySubTopicId(id: number) {
  return slidesMock.filter(
    (slide) => slide.idSubTopic === id,
  )
}