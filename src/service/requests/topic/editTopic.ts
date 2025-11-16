import { ISubTopicEdit } from "service/@types/subtopic";
import { ITopicEdit } from "service/@types/topic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function editTopic(data: ITopicEdit) {
  const { id, ...rest } = data;
  return await apiHistopat.put(`/api/Topic/${id}`, { ...rest });
}
