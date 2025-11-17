import { AxiosResponse } from "axios";
import { IRoleFind } from "service/@types/role";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findRoles(): Promise<IRoleFind[]> {
  const res =  await apiHistopat.get("/api/Role");
  return res.data;
}