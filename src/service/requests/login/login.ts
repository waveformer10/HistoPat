import { IUserFind, UserLogin } from "service/@types/user";
import { apiHistopat } from "service/api/ApiHistopat";

export async function login(data: UserLogin): Promise<IUserFind> {
    const res = await apiHistopat.post('api/User/login', data);
    return res.data;
}