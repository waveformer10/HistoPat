import { ITopicSave } from "service/@types/topic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveTopic(data: ITopicSave) {
  const { idParentEntity, ...rest } = data;
  return await apiHistopat.post("api/Topic", {
    ...rest,
    idModule: idParentEntity
  });
}
