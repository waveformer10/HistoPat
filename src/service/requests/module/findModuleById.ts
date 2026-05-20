// src/service/requests/module/findModuleById.ts
import { modulesMock } from "service/mocks/modules";

export async function findModuleById(id: number) {
  return modulesMock.find((module) => module.id === id) ?? null;
}