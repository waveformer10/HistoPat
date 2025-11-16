export type EntityType = "MODULE" | "TOPIC" | "SUBTOPIC" | "SLIDE";
export type EntityTypeWithoutSlide = Exclude<EntityType, "SLIDE">;
export type OperationType = "SALVAR" | "EDITAR";

export const EntityTitleEnum: Record<EntityType, string> = {
  MODULE: "Módulo",
  SLIDE: "Lâmina",
  SUBTOPIC: "Subtópico",
  TOPIC: "Tópico",
};

export const OperationTitleEnum: Record<OperationType, string> = {
  EDITAR: "Editar",
  SALVAR: "Salvar",
};

export type FormStateType = {
  title: string,
  description: string,
  id?: number,
  imageUrl: string,

}

export type ValidateErrorsType = {
  Title?: string[];
  Description?: string[];
  imageUrl?: string[];
};
