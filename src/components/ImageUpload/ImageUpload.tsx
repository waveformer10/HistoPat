"use client";

import { useEffect, useState } from "react";
import { UploadProps } from "./ImageUpload.types";
import { tv } from "tailwind-variants";
import { Plus, File } from "lucide-react";
import toast from "react-hot-toast";

const uploadStyles = tv({
  slots: {
    wrapper: `flex cursor-pointer flex-col items-center justify-start overflow-hidden rounded-lg border-2 text-[14px] font-semibold text-[#404040] transition`,
    icon: "!mt-3 text-[#404040]",
    text: "mt-2 text-center text-[14px] font-semibold break-all",
  },
  variants: {
    size: {
      default: { wrapper: "h-[94px] w-[195px] gap-[2px] p-[14px]" },
      small: { wrapper: "h-[70px] w-[150px] gap-[1px] p-[10px]" },
      large: { wrapper: "h-[120px] w-[250px] gap-[3px] p-[16px]" },
    },
    state: {
      empty: { wrapper: "border-[#4444444d] bg-white hover:bg-gray-50" },
      filled: { wrapper: "border-gray-300 bg-gray-50" },
    },
  },
  defaultVariants: {
    size: "default",
    state: "empty",
  },
});

export function ImageUpload({ onChange, onReset, reset }: UploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("Nenhuma imagem selecionada", {
        position: "bottom-right",
      });

      return;
    }

    const imageSizeInMB = (file.size / (1024)) / 1024;

    if (imageSizeInMB > 1) {
      toast.error("A imagem é maior que 1MB", {
        position: "bottom-right",
      });

      return;
    }

    setFileName(file.name);
    onChange(file);

  };

  const { wrapper, icon, text } = uploadStyles({
    state: fileName ? "filled" : "empty",
  });

  useEffect(() => {
    if(reset) {
      setFileName(null);
      onReset();
    }
  }, [reset])

  return (
    <label className={wrapper()}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!fileName ? (
        <>
          <Plus className={icon()} size={20} />
          <span className={text()}>Adicionar imagem</span>
        </>
      ) : (
        <>
          <File className={icon()} size={20} />
          <span className={text()}>{fileName}</span>
        </>
      )}
    </label>
  );
}
