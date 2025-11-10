"use client";

import { Badge } from "components/Badge/Badge";
import { Button } from "components/Button/Button";
import { ImagePreview } from "components/ImagePreview/ImagePreview";
import { ImageUpload } from "components/ImageUpload/ImageUpload";
import { Input } from "components/Input/Input";
import { useState } from "react";
import { saveImage } from "service/requests/image/saveImage";
import { tv } from "tailwind-variants";
import {
  EntityTitleEnum,
  EntityType,
  FormProps,
  OperationTitleEnum,
  ValidateErrorsType,
} from "./Form.types";
import { selectPostRequest } from "service/utils/selectPostRequest";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { selectEditRequest } from "service/utils/selectPutRequest";
import { selectDeleteRequest } from "service/utils/selectDeleteRequest";

const formStyles = tv({
  slots: {
    wrapper:
      "bg-form-background flex h-full w-full flex-1 flex-col items-start justify-center gap-4 px-52 py-2.5",
    titleSlot: "mb-2.5 self-center text-2xl font-bold text-gray-900",
    labelImage: "font-bold text-gray-900",
    wrapperStyle: "flex flex-col items-start gap-3",
    wrapperButtons: "flex w-1/3 flex-row items-center gap-2.5",
  },
});

async function handleSaveImage() {
  try {
    const imageUrl = saveImage();
    return imageUrl;
  } catch (error) {}
}

export default function Form({ type, operation }: FormProps) {
  const { titleSlot, wrapper, wrapperStyle, wrapperButtons, labelImage } =
    formStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("dasdasd");

  const [validateErrors, setValidateErrors] = useState<ValidateErrorsType>({});

  async function handleSaveSubmit() {
    try {
      const res = await selectPostRequest({
        type,
        description: description,
        imageUrl: imageUrl,
        title: title,
      });

      console.log("REQUISIÇÂO BEM SUCEDIDA", res);
      setValidateErrors({});
      toast.success("Item cadastrado", {
        position: "bottom-right",
      });
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
    }
  }

  async function handleEditSubmit() {
    try {
      const res = await selectEditRequest({
        id: 2,
        description,
        title,
        type,
        imageUrl,
      });

      console.log("REQUISIÇÂO BEM SUCEDIDA", res);
      setValidateErrors({});
      toast.success("Item alterado", {
        position: "bottom-right",
      });
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
    }
  }

  async function handleDeleteSubmit() {
    try {
      const res = await selectDeleteRequest(type, 2);

      console.log("REQUISIÇÂO BEM SUCEDIDA", res);
      toast.success("Item removido", {
        position: "bottom-right",
      });
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
    }
  }

  return (
    <div className={wrapper()}>
      <p className={titleSlot()}>
        {OperationTitleEnum[operation]} {EntityTitleEnum[type]}
      </p>
      <Input
        label="Título"
        placeholder="Título"
        value={title}
        onChangeValue={(text) => setTitle(text)}
        errorMessage={validateErrors.Title?.[0]}
      />
      {type !== "TOPIC" && (
        <>
          <Input
            label="Descrição"
            placeholder="Descrição"
            multiline
            initialRows={3}
            value={description}
            onChangeValue={(text) => setDescription(text)}
            errorMessage={validateErrors.Description?.[0]}
          />
          {imageUrl && (
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
              onChange={(file) => console.log("Imagem selecionada:", file)}
            />
          </div>
        </>
      )}
      <div className={wrapperButtons()}>
        <Button
          title="Salvar"
          onPress={operation === "SALVAR" ? handleSaveSubmit : handleEditSubmit}
        />
        <Button title="Excluir" onPress={() => {}} />
      </div>
    </div>
  );
}
