import { apiHistopat } from "service/api/ApiHistopat";

export async function deleteUser(idUser: number) {
  return await apiHistopat.delete(`/api/User/${idUser}`);
}