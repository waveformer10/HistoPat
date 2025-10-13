"use client";

import { useState } from "react";
import { UploadProps } from "./ImageUpload.types";
import { tv } from "tailwind-variants";
import { Plus, File } from "lucide-react";

const uploadStyles = tv({
  base: `
    flex flex-col items-center justify-start
    bg-[#FFFFFF]
    border-2 border-[#4444444d]
    rounded-lg
    cursor-pointer
    transition
    hover:bg-gray-50
    text-[#404040]
    font-semibold
    text-[14px]
  `,
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

  return (
    <label
      className={uploadStyles()}
      style={{
        width: "195px",
        height: "94px",
        padding: "14px",
        gap: "2px",
        color: "#404040",
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!fileName ? (
        <>
          <Plus size={20} />
          <span className="mt-2 text-[14px] font-semibold">Adicionar imagem</span>
        </>
      ) : (
        <>
          <File size={20} />
          <span className="mt-2 text-[14px] font-semibold break-all text-center">
            {fileName}
          </span>
        </>
      )}
    </label>
  );
}
