import { apiHistopat } from "service/api/ApiHistopat";

export async function deleteRole(idRole: number) {
  return await apiHistopat.delete(`/api/Role/${idRole}`);
}