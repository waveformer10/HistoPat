import { AxiosResponse } from "axios";
import { IModuleFind } from "service/@types/module";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findModules(): Promise<IModuleFind[]> {
  const res =  await apiHistopat.get("/api/Module");
  return res.data;
}