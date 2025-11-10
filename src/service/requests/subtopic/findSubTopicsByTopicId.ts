import { apiHistopat } from "service/api/ApiHistopat";

export async function findSubTopicsByTopicId(id: number){
    return await apiHistopat.get(`api/SubTopic/topic/${id}`)
}