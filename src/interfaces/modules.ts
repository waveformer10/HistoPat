export interface ModuleImage {
  id: number;
  fileName: string;
  filePath: string;
  uploadedAt: string;
  isActive: boolean;
  size: number;
}

export interface Module {
  id: number;
  title: string;
  active: boolean;
  createdAt: string;
  lastModified?: string;
  moduleImages?: ModuleImage[];
  description?: string;
}
