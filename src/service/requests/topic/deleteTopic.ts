import { apiHistopat } from "service/api/ApiHistopat";

export async function deleteTopic(id: number) {
  return await apiHistopat.delete(`api/Topic/${id}`);
}
