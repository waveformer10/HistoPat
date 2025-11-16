import { IModuleEdit, IModuleSave } from "service/@types/module";
import { apiHistopat } from "service/api/ApiHistopat";

export async function editModule(data: IModuleEdit) {
  const { id, ...rest } = data;
  return await apiHistopat.put(`/api/Module/${id}`, { ...rest });
}
