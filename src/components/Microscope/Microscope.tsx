"use client";

import { useState } from "react";
import Image from "next/image";
import microscope from "../../../public/images/microscope.png";
import instructionImg from "../../../public/images/instruction.png";

type PartInfo = {
  name: string;
  description: string;
};

const PARTS: {
  id: string;
  area: { top: number; left: number; width: number; height: number };
  info: PartInfo;
}[] = [
  {
    id: "BASE",
    area: { top: 300, left: 50, width: 200, height: 100 },
    info: {
      name: "BASE",
      description: "Sustenta todo o microscópio.",
    },
  },
  {
    id: "PLATINA",
    area: { top: 260, left: 70, width: 180, height: 60 },
    info: {
      name: "PLATINA",
      description: "Superfície onde o material é colocado.",
    },
  },
  {
    id: "BRAÇO / COLUNA",
    area: { top: 120, left: 220, width: 80, height: 200 },
    info: {
      name: "BRAÇO OU COLUNA",
      description: "Suporta as partes superiores do microscópio.",
    },
  },
  {
    id: "AJUSTE MACRO",
    area: { top: 160, left: 200, width: 100, height: 80 },
    info: {
      name: "PARAFUSO MACROMÉTRICO",
      description: "Ajuste grosseiro de foco.",
    },
  },
  {
    id: "CABO / FONTE DE LUZ",
    area: { top: 140, left: 150, width: 100, height: 60 },
    info: {
      name: "CABO / ILUMINAÇÃO",
      description: "Fornece energia ao sistema.",
    },
  },
  {
    id: "OBJETIVA",
    area: { top: 120, left: 100, width: 100, height: 80 },
    info: {
      name: "LENTES OBJETIVAS",
      description: "Lentes próximas ao objeto observado.",
    },
  },
  {
    id: "TUBO ÓTICO",
    area: { top: 50, left: 120, width: 140, height: 90 },
    info: {
      name: "TUBO ÓTICO",
      description: "Estrutura que conecta as objetivas às oculares.",
    },
  },
  {
    id: "OCULAR",
    area: { top: 0, left: 70, width: 200, height: 80 },
    info: {
      name: "LENTES OCULARES",
      description: "Lentes próximas aos olhos do observador.",
    },
  },
];

export default function MicroscopeInteractive() {
  const [hoveredPart, setHoveredPart] = useState<PartInfo | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full px-4">
      {/* Imagem do microscópio */}
      <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[450px]">
        <Image
          src={microscope}
          alt="Microscópio"
          className="w-full h-auto"
          priority
        />

        {/* Áreas clicáveis responsivas (usando porcentagem relativa ao tamanho da imagem original 450px de largura x 400px de altura aprox.) */}
        {PARTS.map(({ id, area, info }) => (
          <div
            key={id}
            onMouseEnter={() => setHoveredPart(info)}
            onMouseLeave={() => setHoveredPart(null)}
            style={{
              position: "absolute",
              top: `${(area.top / 400) * 100}%`,
              left: `${(area.left / 450) * 100}%`,
              width: `${(area.width / 450) * 100}%`,
              height: `${(area.height / 400) * 100}%`,
              cursor: "pointer",
              opacity: 0, // invisível
            }}
          />
        ))}
      </div>

      {/* Painel de informação */}
      <div className="flex items-center justify-center w-full md:w-[450px] h-auto md:h-[400px] border rounded-lg p-6 bg-gray-50 shadow-sm">
        {hoveredPart ? (
          <div className="text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
              {hoveredPart.name}
            </h2>
            <p className="text-gray-700 mt-2 text-sm sm:text-base md:text-lg leading-relaxed">
              {hoveredPart.description}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center opacity-75">
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Posicione o cursor sobre uma parte do microscópio.
            </p>
            <Image
              src={instructionImg}
              alt="Passe o cursor"
              width={220}
              className="mt-3 sm:w-[280px] md:w-[320px] h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
