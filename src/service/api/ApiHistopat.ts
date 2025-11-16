import axios from "axios";

export const apiHistopat = axios.create({
  baseURL: "http://localhost:5047"
});

