import { ITopicFind } from "service/@types/topic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findTopicById(id: number): Promise<ITopicFind> {
    return await apiHistopat.get(`api/Topic/${id}`);
}