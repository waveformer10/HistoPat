import { ITopicFind } from "service/@types/topic";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findTopicsByModuleId(id: number): Promise<ITopicFind[]> {
    const res = await apiHistopat.get(`api/Topic/module/${id}`)
    return res.data
}