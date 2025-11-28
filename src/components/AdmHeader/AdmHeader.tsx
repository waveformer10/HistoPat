import React from "react";
import { AdmHeaderProps } from "./AdmHeader.types";
import { IconLib } from "components/IconLib/IconLib";
import { useRouter } from "next/navigation";

export function AdmHeader({ texto }: AdmHeaderProps) {
  const router = useRouter();
  const inicial = texto?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-semibold text-gray-800">
        Olá, {texto}
      </h1>

      <button style={{ cursor: 'pointer' }} onClick={() => router.push("/")}>
        <IconLib
          iconLibName="ri"
          icon="RiLogoutBoxRLine"
          color="var(--color-dark-blue)"
          size={30}
        />
      </button>
    </div>
  );
}
