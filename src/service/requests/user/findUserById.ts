import { AxiosResponse } from "axios";
import { IUserFind } from "service/@types/user";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findUserById(idUser: number): Promise<IUserFind[]> {
  return await apiHistopat.get(`/api/User/${idUser}`);
}