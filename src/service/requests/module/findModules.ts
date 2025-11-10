import { apiHistopat } from "service/api/ApiHistopat";

export async function findModules() {
  return await apiHistopat.get("/api/Module");
}