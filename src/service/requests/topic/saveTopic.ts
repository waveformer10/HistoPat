import { ITopicSave } from "service/@types/topic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveTopic(data: ITopicSave) {
  return await apiHistopat.post("api/Topic", data);
}
