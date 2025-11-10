import { IModuleEdit, IModuleSave } from "service/@types/module";
import { apiHistopat } from "service/api/ApiHistopat";

export async function editModule(data: IModuleEdit) {
  return await apiHistopat.put("/api/Module", data);
}
