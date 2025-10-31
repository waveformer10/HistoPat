import axios from "axios";
import { subTopic } from "../interfaces/subTopic";

const API_BASE_URL = "http://localhost:5047/api/SubTopic";

export const getSubTopics = async (): Promise<subTopic[]> => {
  const response = await axios.get<subTopic[]>(API_BASE_URL);
  return response.data;
};

export const getSubTopicById = async (id: number): Promise<subTopic> => {
  const response = await axios.get<subTopic>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createSubTopic = async (data: Partial<subTopic>): Promise<subTopic> => {
  const response = await axios.post<subTopic>(API_BASE_URL, data);
  return response.data;
};

export const updateSubTopic = async (id: number, data: Partial<subTopic>): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, data);
};

export const deleteSubTopic = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
