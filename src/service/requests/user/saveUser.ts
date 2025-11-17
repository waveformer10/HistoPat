import { AxiosResponse } from "axios";
import { IUserBase } from "service/@types/user";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveUser(data: IUserBase) {
    return await apiHistopat.post("/api/User", data);
}