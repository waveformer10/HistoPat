import { apiHistopat } from "service/api/ApiHistopat";

export async function findTopicById(id: number){
    return await apiHistopat.get(`api/Topic/${id}`);
}