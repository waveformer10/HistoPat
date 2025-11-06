import { ISlideEdit } from "service/@types/slide";
import { apiHistopat } from "service/api/ApiHistopat";

export async function editSlide(data: ISlideEdit) {
  return await apiHistopat.put("/api/Slide", data);
}
