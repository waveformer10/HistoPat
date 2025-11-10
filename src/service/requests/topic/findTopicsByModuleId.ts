import { apiHistopat } from "service/api/ApiHistopat";

export async function findTopicsByModuleId(id: number){
    return await apiHistopat.get(`api/Topic/module/${id}`);
}