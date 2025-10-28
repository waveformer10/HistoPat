import { ISubTopicSave } from "service/@types/subtopic";

export async function saveSubTopic(props: ISubTopicSave) {
  console.log("SUBTOPIC");
  Object.values(props).forEach((item) => console.log(item));
}
