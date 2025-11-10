import { ISubTopicFind } from "service/@types/subtopic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findSubTopicById(id: number): Promise<ISubTopicFind>{
    const res = await apiHistopat.get(`api/SubTopic/${id}`);
    return res.data;
}