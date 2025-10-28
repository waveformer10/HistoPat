import { ISlideSave } from "service/@types/slide";

export async function saveSlide(props: ISlideSave) {
  console.log("SLIDE");
  Object.values(props).forEach((item) => console.log(item));
}
