import { apiHistopat } from "service/api/ApiHistopat";

export async function deleteSubTopic(id: number) {
  return await apiHistopat.delete(`api/SubTopic/${id}`);
}
