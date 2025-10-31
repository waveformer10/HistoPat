import axios from "axios";
import { topic } from "../interfaces/topic";

const API_BASE_URL = "http://localhost:5047/api/Topic";

export const getTopics = async (): Promise<topic[]> => {
  const response = await axios.get<topic[]>(API_BASE_URL);
  return response.data;
};

export const getTopicById = async (id: number): Promise<topic> => {
  const response = await axios.get<topic>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createTopic = async (data: Partial<topic>): Promise<topic> => {
  const response = await axios.post<topic>(API_BASE_URL, data);
  return response.data;
};

export const updateTopic = async (id: number, data: Partial<topic>): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, data);
};

export const deleteTopic = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
