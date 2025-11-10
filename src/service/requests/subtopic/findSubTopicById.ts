import { apiHistopat } from "service/api/ApiHistopat";

export async function findSubTopicById(id: number){
    return await apiHistopat.get(`api/SubTopic/${id}`);
}