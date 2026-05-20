import { modulesMock } from 'service/mocks/modules'

export async function findModules() {
  return {
    data: modulesMock,
  }
}