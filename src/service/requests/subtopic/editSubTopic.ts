import { ISubTopicEdit } from "service/@types/subtopic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function editSubTopic(data: ISubTopicEdit) {
  const { id, ...rest } = data;
  return await apiHistopat.put(`/api/SubTopic/${id}`, { ...rest });
}
