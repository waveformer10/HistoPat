import { apiHistopat } from "service/api/ApiHistopat";

export async function findSlideById(id:number) {
    return await apiHistopat.get(`api/Slide/${id}`);
}