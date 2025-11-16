import { ISlideFind } from "service/@types/slide";
import { apiHistopat } from "service/api/ApiHistopat";

export async  function findSlidesBySubTopicId(id: number): Promise<ISlideFind[]>{
    const res = await apiHistopat.get(`api/Slide/subtopic/${id}`)
    return res.data
}