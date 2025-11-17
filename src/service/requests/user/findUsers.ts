import { AxiosResponse } from "axios";
import { IUserFind } from "service/@types/user";
import { apiHistopat } from "service/api/ApiHistopat";

export async function findUsers(): Promise<IUserFind[]> {
  const res =  await apiHistopat.get("/api/User");
  return res.data;
}