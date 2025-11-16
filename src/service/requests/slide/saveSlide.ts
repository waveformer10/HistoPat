import { ISlideSave } from "service/@types/slide";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveSlide(data: ISlideSave) {
  const { idParentEntity, ...rest } = data;
  return await apiHistopat.post("/api/Slide", {
    ...rest,
    idSubTopico: idParentEntity
  });
}
