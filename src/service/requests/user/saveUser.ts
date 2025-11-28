import { AxiosResponse } from "axios";
import { IUserBase, IUserSave } from "service/@types/user";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveUser(data: IUserSave) {
    return await apiHistopat.post("/api/User", data);
}