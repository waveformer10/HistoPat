import { ISlideFind } from "service/@types/slide";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findSlideById(id:number): Promise<ISlideFind> {
    return await apiHistopat.get(`api/Slide/${id}`);
}