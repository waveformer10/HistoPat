import { modulesMock } from 'service/mocks/modules'

export async function findModuleById(id: number) {
  const module = modulesMock.find(
    (module) => module.id === id,
  )

  return {
    data: module,
  }
}