import React from "react";
import { AdmHeaderProps } from "./AdmHeader.types";

export function AdmHeader({ texto }: AdmHeaderProps) {
  const inicial = texto?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-semibold text-gray-800">
        Olá, {texto}
      </h1>

      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-dark-blue text-white text-xl font-bold">
        {inicial}
      </div>
    </div>
  );
}
