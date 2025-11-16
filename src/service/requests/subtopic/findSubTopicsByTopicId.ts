import { ISubTopicFind } from "service/@types/subtopic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findSubTopicsByTopicId(id: number): Promise<ISubTopicFind[]> {
    const res = await apiHistopat.get(`api/SubTopic/topic/${id}`);
    return res.data;
}