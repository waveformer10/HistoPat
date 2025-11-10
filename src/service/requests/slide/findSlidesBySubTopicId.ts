import { apiHistopat } from "service/api/ApiHistopat";

export async  function findSlidesBySubTopicId(id: number){
    return await apiHistopat.get(`api/Slide/subtopic/${id}`)
}