"use client";

import { Badge } from "components/Badge/Badge";
import { Button } from "components/Button/Button";
import { ImagePreview } from "components/ImagePreview/ImagePreview";
import { ImageUpload } from "components/ImageUpload/ImageUpload";
import { Input } from "components/Input/Input";
import { useEffect, useState } from "react";
import { saveImage } from "service/requests/image/saveImage";
import { tv } from "tailwind-variants";
import {
  EntityTitleEnum,
  EntityType,
  FormStateType,
  OperationTitleEnum,
  ValidateErrorsType,
} from "./Form.types";
import { selectPostRequest } from "service/utils/selectPostRequest";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { selectEditRequest } from "service/utils/selectPutRequest";
import { selectDeleteRequest } from "service/utils/selectDeleteRequest";
import { appState } from "store/appState";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "service/@types/queryKeys";
import { http } from "service/requests/http";

const formStyles = tv({
  slots: {
    wrapper:
      "bg-form-background flex h-full w-full flex-1 flex-col items-start justify-center gap-4 px-11 py-2.5 overflow-auto relative",
    titleSlot: "mb-2.5 self-center text-2xl font-bold text-gray-900",
    labelImage: "font-bold text-gray-900",
    wrapperStyle: "flex flex-col items-start gap-3",
    wrapperButtons: "flex w-1/3 flex-row items-center gap-2.5",
    pathSlot: "flex flex-row gap-0.5 flex-wrap",
    titlePath: "font-bold text-gray-900",
    normalPath: "font-normal text-gray-500",

    wrapperModal: "absolute inset-0 bg-black/50 flex items-center justify-center",
    modalContent: "flex flex-col bg-form-background p-4 rounded-[4px] gap-5 max-w-2/4",
    wrapperRowModal: "flex flex-row items-center justify-center gap-3"
  },
});

export default function Form() {
  const { titleSlot, wrapper, wrapperStyle, wrapperButtons, labelImage, normalPath, pathSlot, titlePath, wrapperRowModal, modalContent, wrapperModal } =
    formStyles();

  const [formState, setFormState] = useState<FormStateType>({
    title: "",
    description: "",
    imageUrl: "",
  })
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const selectedEntity = appState((state) => state.selectedEntity);
  const entityForm = appState((state) => state.entityForm);
  const path = appState((state) => state.path);
  const idParentEntityToSave = appState((state) => state.idParentEntityToSave);
  const setcloseParentOf = appState((state) => state.setcloseParentOf);

  const [validateErrors, setValidateErrors] = useState<ValidateErrorsType>({});

  async function handleSaveSubmit() {
    try {
      await selectPostRequest({
        type: entityForm.entityType,
        description: formState.description,
        imageUrl: formState.imageUrl,
        title: formState.title,
        idParentEntity: idParentEntityToSave ? idParentEntityToSave : 0,
      });

      setValidateErrors({});

      toast.success("Item cadastrado", {
        position: "bottom-right",
      });

      setcloseParentOf(idParentEntityToSave);

    } catch (error) {
      if (error && error instanceof AxiosError) {
        if (
          error.status === 400 &&
          error.response?.data.title ===
          "One or more validation errors occurred."
        ) {
          setValidateErrors(error.response.data.errors);
          return;
        }
      }

      console.log("ERRO DESCONHECIDO", error);
      toast.error("Falha ao salvar o item", {
        position: "bottom-right",
      });
    }
  }

  async function handleEditSubmit() {
    try {
      if (!formState.id) {
        toast.error("Não foi possível editar o item", {
          position: "bottom-right",
        });
        return;
      }

      await selectEditRequest({
        id: formState.id,
        description: formState.description,
        title: formState.title,
        type: entityForm.entityType,
        imageUrl: formState.imageUrl
      });

      setValidateErrors({});
      toast.success("Item alterado", {
        position: "bottom-right",
      });

      setcloseParentOf(selectedEntity.parentId);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        if (
          error.status === 400 &&
          error.response?.data.title ===
          "One or more validation errors occurred."
        ) {
          setValidateErrors(error.response.data.errors);
          return;
        }
      }
      console.log("ERRO DESCONHECIDO", error);
      toast.error("Falha ao editar o item", {
        position: "bottom-right",
      });
    }
  }

  async function handleDeleteSubmit() {
    try {
      await selectDeleteRequest(entityForm.entityType, selectedEntity.id);

      toast.success("Item removido", {
        position: "bottom-right",
      });

      setcloseParentOf(selectedEntity.parentId);

    } catch (error) {
      if (error && error instanceof AxiosError) {
        if (
          error.status === 400 &&
          error.response?.data.title ===
          "One or more validation errors occurred."
        ) {
          setValidateErrors(error.response.data.errors);
          return;
        }
      }
      console.log("ERRO DESCONHECIDO", error);
      toast.error("Falha ao excluir o item", {
        position: "bottom-right",
      });
    }
  }

  async function handleUploadImage() {
    try {
      if (!selectedImage) {
        toast.error("Selecione uma imagem", {
          position: "bottom-right",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("customFileName", `${entityForm.entityType}-${selectedEntity.id}`);

      const res = await http.image.saveImage(formData);

      console.log(res);
    } catch (error) {
      toast.error("Falha no upload da imagem", {
        position: "bottom-right",
      });
    }

  }

  useEffect(() => {
    if (Object.keys(selectedEntity).length > 1 && entityForm.operation === "EDITAR") {
      setFormState({
        description: selectedEntity.description,
        imageUrl: selectedEntity?.imageUrl ? selectedEntity.imageUrl : "",
        title: selectedEntity.title,
        id: selectedEntity.id
      })
    } else {
      setFormState({
        description: "",
        imageUrl: "",
        title: "",
      })
    }
  }, [selectedEntity])

  return (
    <div className={wrapper()}>
      {isOpenModal && <div className={wrapperModal()}>
        <div className={modalContent()}>
          <p className="text-black text-center">Tem certeza de que deseja excluir o item {EntityTitleEnum[entityForm.entityType]}? <br /> A exclusão também removerá todos os subitens vinculados a ele de forma permanente.</p>
          <div className={wrapperRowModal()}>
            <Button
              onPress={() => {
                setIsOpenModal(false);
                handleDeleteSubmit();
              }}
              title="Sim"
              variant="secondary"
            />
            <Button
              onPress={() => { setIsOpenModal(false) }}
              title="Não"
            />
          </div>
        </div>
      </div>}
      <p className={titleSlot()}>
        {OperationTitleEnum[entityForm.operation]} {EntityTitleEnum[entityForm.entityType]}
      </p>
      <div className={pathSlot()}>
        <p className={titlePath()}>Caminho: </p>
        <p className={normalPath()}>{path}</p>
      </div>
      <Input
        label="Título"
        placeholder="Título"
        value={formState.title}
        onChangeValue={(text) => setFormState(prev => ({
          ...prev, title: text
        }))}
        errorMessage={validateErrors.Title?.[0]}
      />
      {entityForm.entityType !== "TOPIC" && (
        <>
          <Input
            label="Descrição"
            placeholder="Descrição"
            multiline
            initialRows={3}
            value={formState.description}
            onChangeValue={(text) => setFormState(prev => ({
              ...prev, description: text
            }))}
            errorMessage={validateErrors.Description?.[0]}
          />
          {formState.imageUrl && (
            <div className={wrapperStyle()}>
              <p className={labelImage()}>Imagem</p>
              <ImagePreview
                imageSrc="/images.jpeg"
                fileName="minha-imagem.jpg"
                size="small"
              />
            </div>
          )}
          <div className={wrapperStyle()}>
            <Badge text="tamanho permitido (9000kb)" variant="primary" />
            <ImageUpload
              onChange={(file) => setSelectedImage(file)}
            />
          </div>
        </>
      )}
      <div className={wrapperButtons()}>
        <Button
          title="Salvar"
          onPress={handleUploadImage}
        />
        <Button title="Excluir" onPress={() => setIsOpenModal(true)} />
      </div>
    </div>
  );
}
