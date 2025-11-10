import { IModuleEdit, IModuleSave } from "service/@types/module";
import { apiHistopat } from "service/api/ApiHistopat";

export async function deleteModule(id: number) {
  return await apiHistopat.delete(`api/Module/${id}`);
}
