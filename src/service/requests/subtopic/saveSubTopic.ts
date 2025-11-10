import { ISubTopicSave } from "service/@types/subtopic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveSubTopic(data: ISubTopicSave) {
  return await apiHistopat.post("/api/SubTopic", data);
}
