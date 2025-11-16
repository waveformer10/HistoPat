import { ISubTopicSave } from "service/@types/subtopic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveSubTopic(data: ISubTopicSave) {
  const { idParentEntity, ...rest } = data;
  return await apiHistopat.post("/api/SubTopic", {
    ...rest,
    idTopic: idParentEntity
  });
}
