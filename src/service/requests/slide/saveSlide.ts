import { ISlideSave } from "service/@types/slide";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveSlide(data: ISlideSave) {
  return await apiHistopat.post("/api/Slide", data);
}
