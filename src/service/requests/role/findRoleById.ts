import { AxiosResponse } from "axios";
import { IRoleFind } from "service/@types/role";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findRoleById(idRole: number): Promise<IRoleFind[]> {
  return await apiHistopat.get(`/api/Role/${idRole}`);
}