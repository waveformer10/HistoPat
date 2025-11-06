"use client";

import { Badge } from "components/Badge/Badge";
import { Button } from "components/Button/Button";
import { ImagePreview } from "components/ImagePreview/ImagePreview";
import { ImageUpload } from "components/ImageUpload/ImageUpload";
import { Input } from "components/Input/Input";
import { useEffect, useState } from "react";
import { saveImage } from "service/requests/image/saveImage";
import { tv } from "tailwind-variants";
import { EntityType, FormProps } from "./Form.types";
import { selectPostRequest } from "service/utils/selectPostRequest";

const formStyles = tv({
  slots: {
    wrapper:
      "bg-form-background flex h-full w-full flex-1 flex-col items-start justify-center gap-5 px-24 py-14",
    titleSlot: "mb-2.5 self-center text-4xl font-bold text-gray-900",
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

export default function Form({ type }: FormProps) {
  const { titleSlot, wrapper, wrapperStyle, wrapperButtons, labelImage } =
    formStyles();

  const [title, setTitle] = useState("titulo");
  const [description, setDescription] = useState("description");
  const [imageUrl, setImageUrl] = useState("url");

  async function handleFormSubmit() {
    try {
      selectPostRequest({
        type,
        active: true,
        createdAt: new Date().toISOString(),
        description: description,
        imageUrl: imageUrl,
        title: title,
      });
    } catch (error) {
      window.alert("Está errado");
    }
  }

  return (
    <div className={wrapper()}>
      <p className={titleSlot()}>Editar módulo</p>
      <Input
        label="Título"
        placeholder="Título"
        value={title}
        onChangeValue={(text) => setTitle(text)}
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
          />
          <div className={wrapperStyle()}>
            <p className={labelImage()}>Imagem</p>
            <ImagePreview imageSrc="/images.jpeg" fileName="minha-imagem.jpg" />
          </div>
          <div className={wrapperStyle()}>
            <Badge text="tamanho permitido (9000kb)" variant="primary" />
            <ImageUpload
              onChange={(file) => console.log("Imagem selecionada:", file)}
            />
          </div>
        </>
      )}
      <div className={wrapperButtons()}>
        <Button title="Salvar" onPress={handleFormSubmit} />
        <Button title="Excluir" onPress={() => {}} />
      </div>
    </div>
  );
}
