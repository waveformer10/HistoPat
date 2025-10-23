"use client";

import { useState } from "react";
import { UploadProps } from "./ImageUpload.types";
import { tv } from "tailwind-variants";
import { Plus, File } from "lucide-react";

const uploadStyles = tv({
  slots: {
    wrapper: `
      flex flex-col items-center justify-start
      cursor-pointer
      transition
      rounded-lg
      border-2
      text-[#404040]
      font-semibold
      text-[14px]
      overflow-hidden
    `,
    icon: "!mt-3 text-[#404040]",
    text: "mt-2 text-[14px] font-semibold text-center break-all",
  },
  variants: {
    size: {
      default: { wrapper: "w-[195px] h-[94px] p-[14px] gap-[2px]" },
      small: { wrapper: "w-[150px] h-[70px] p-[10px] gap-[1px]" },
      large: { wrapper: "w-[250px] h-[120px] p-[16px] gap-[3px]" },
    },
    state: {
      empty: { wrapper: "bg-white border-[#4444444d] hover:bg-gray-50" },
      filled: { wrapper: "bg-gray-50 border-gray-300" },
    },
  },
  defaultVariants: {
    size: "default",
    state: "empty",
  },
});

export function ImageUpload({ onChange }: UploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  const { wrapper, icon, text } = uploadStyles({
    state: fileName ? "filled" : "empty",
  });

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
