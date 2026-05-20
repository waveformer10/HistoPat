import { ISubTopicFind } from '../@types/subtopic'

export const subTopicsMock: ISubTopicFind[] = [
  {
    id: 1,
    title: 'Epitélio Escamoso',
    description: 'Observação das camadas celulares.',
    imageUrl:
      'https://res.cloudinary.com/histopat/image/upload/v1763993123/wroeuckyylc62ljjqpon.jpg',
    idTopic: 1,
    active: true,
    createdAt: '2025-11-10T18:14:09.7031589',
    lastModified: null,
  },
  {
    id: 2,
    title: 'Tecido Conjuntivo',
    description: 'Características microscópicas.',
    imageUrl:
      'https://res.cloudinary.com/histopat/image/upload/v1763993233/syaukvav7v4cbzlujecx.jpg',
    idTopic: 1,
    active: true,
    createdAt: '2025-11-10T18:14:09.7031589',
    lastModified: null,
  },
  {
    id: 3,
    title: 'Fixação Química',
    description: 'Métodos de preservação.',
    imageUrl:
      'https://res.cloudinary.com/histopat/image/upload/v1763993123/wroeuckyylc62ljjqpon.jpg',
    idTopic: 2,
    active: true,
    createdAt: '2025-11-10T18:14:09.7031589',
    lastModified: null,
  },
]