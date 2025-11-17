import { AxiosResponse } from "axios";
import { IRoleBase } from "service/@types/role";
import { apiHistopat } from "service/api/ApiHistopat";

export async function saveRole(data: IRoleBase) {
    return await apiHistopat.post("/api/Role", data);
}