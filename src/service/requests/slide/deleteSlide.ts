import { apiHistopat } from "service/api/ApiHistopat";

export async function deleteSlide(id: number) {
  return await apiHistopat.delete(`api/Slide/${id}`);
}
