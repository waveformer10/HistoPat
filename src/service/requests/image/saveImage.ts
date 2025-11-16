import { apiHistopat } from "service/api/ApiHistopat";

export async function saveImage(formData: FormData): Promise<string> {
  const res = await apiHistopat.post("api/Image/upload", formData)
  return res.data
}
