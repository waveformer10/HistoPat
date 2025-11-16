import { ISlideEdit } from "service/@types/slide";
import { apiHistopat } from "service/api/ApiHistopat";

export async function editSlide(data: ISlideEdit) {
  const { id, ...rest } = data;
  return await apiHistopat.put(`/api/Slide/${id}`, { ...rest });
}
