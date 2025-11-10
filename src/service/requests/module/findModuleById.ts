import { apiHistopat } from "service/api/ApiHistopat";

export async function findModuleById(id: number) {
  return await apiHistopat.get(`api/Module/${id}`);
}