import { IModuleSave } from "service/@types/module";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveModule(data: IModuleSave) {
  return await apiHistopat.post("/api/Module", data);
}
