import { IModuleFind } from "service/@types/module";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findModuleById(id: number): Promise<IModuleFind> {
  return await apiHistopat.get(`api/Module/${id}`);
}