import { ITopicSave } from "service/@types/topic";

export async function saveTopic(props: ITopicSave) {
  console.log("TOPIC");
  Object.values(props).forEach((item) => console.log(item));
}
