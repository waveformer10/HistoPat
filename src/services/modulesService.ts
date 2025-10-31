import axios from "axios";
import { Module } from "../interfaces/modules";

const API_BASE_URL = "http://localhost:5047/api/Module";

export const getModules = async (): Promise<Module[]> => {
  const response = await axios.get<Module[]>(API_BASE_URL);
  return response.data;
};

export const getModuleById = async (id: number): Promise<Module> => {
  const response = await axios.get<Module>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createModule = async (data: Partial<Module>): Promise<Module> => {
  const response = await axios.post<Module>(API_BASE_URL, data);
  return response.data;
};

export const updateModule = async (id: number, data: Partial<Module>): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, data);
};

export const deleteModule = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.path;
};

export const downloadImage = async (fileName: string): Promise<Blob> => {
  const response = await axios.get(`${API_BASE_URL}/download/${fileName}`, {
    responseType: "blob",
  });
  return response.data;
};
