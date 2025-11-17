"use client";

import { useState } from "react";
import Image from "next/image";
import microscope from "../../../public/images/microscope.png";
import instructionImg from "../../../public/images/instruction.png";

// Lista de partes com polígonos reais (mantida original em px)
const PARTS = [
  {
    id: "OCULAR",
    img: "/images/microscope6.png",
    coords:
      "20.2,15.4,25,29.8,44.2,53.8,53.8,64.6,59.8,70.6,95.8,39.4,82.6,21.4,53.8,-6.2,46.6,-9.8,33.4,-0.2",
    info: {
      name: "LENTES OCULARES",
      description: "Lentes próximas aos olhos do observador.",
    },
  },
  {
    id: "PLATINA",
    img: "/images/microscope4.png",
    coords:
      "137.2,421,88,430.6,90.4,436.6,120.4,441.4,173.2,441.4,204.4,435.4,186.4,427,162.4,421",
    info: {
      name: "PLATINA",
      description: "Superfície onde o material é colocado.",
    },
  },
  {
    id: "BASE",
    img: "/images/microscope1.png",
    coords: "105.2,450.4,80.6,500.4,80.2,520.8,100.4,540.8,350,540.6,360.6,520.4,360.4,480,350.6,450.6,320.8,440.6,280.6,440.6,230.8,444.4,217.4,446.8,230.4,454.4,210.6,460,140.4,465.8,130.2,460.2",
    info: {
      name: "BASE",
      description: "Sustenta todo o microscópio."
    }
  },
  {
    id: "AJUSTE MACRO",
    img: "/images/microscope3.png",
    coords:
      "273.2,239.2,255.2,264.4,266,288.4,286.4,300.4,306.8,296.8,328.4,274,324.8,247.6,302,233.2,292.4,230.8",
    info: {
      name: "PARAFUSO MACROMÉTRICO",
      description: "Ajuste grosseiro de foco."
    }
  },
  {
    id: "OBJETIVA",
    img: "/images/microscope5.png",
    coords:
      "105.6,237,117.6,258.6,117.6,268.2,151.2,270.6,182.4,268.2,178.8,258.6,190.8,235.8,146.4,232.2",
    info: {
      name: "LENTES OBJETIVAS",
      description: "Lentes próximas ao objeto observado.",
    },
  },
  {
    id: "BRAÇO / COLUNA",
    img: "/images/microscope2.png",
    coords: "311.2,137.8,308.8,213.4,276.4,214.6,276.4,220.6,335.2,220.6,336.4,244.6,334,278.2,322,291.4,306.4,304.6,274,304.6,269.2,315.4,278.8,331,318.4,331,317.2,356.2,314.8,383.8,311.2,411.4,307.6,425.8,358.8,420,358,370,368.8,330.4,365.2,328.6,355.6,221.8,343.6,210.8,343.6,157.4,341.2,120.4",
    info: {
      name: "BRAÇO OU COLUNA",
      description: "Suporta as partes superiores do microscópio."
    }
  }
];

// Função para converter coordenadas para %
function convertCoordsToPercent(coords: string, width = 450, height = 500) {
  const values = coords.split(",").map(Number);

  const converted = values.map((value, index) => {
    const isX = index % 2 === 0;
    const percent = isX ? (value / width) * 100 : (value / height) * 100;
    return percent.toFixed(4);
  });

  return converted.join(",");
}

export default function MicroscopeInteractive() {
  const [hoveredPart, setHoveredPart] = useState<any>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full px-4">

      {/* Imagem + Polígonos */}
      <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[450px] h-[380px] sm:h-[420px] md:h-[480px] lg:h-[550px]">

        <Image
          src={hoveredPart?.img || microscope}
          alt="Microscópio"
          fill
          sizes="100vw"
          className="object-contain pointer-events-none"
          priority
        />

        <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full">
          {PARTS.map(({ id, coords, info, img }) => {
            const points = convertCoordsToPercent(coords)
              .replace(/,/g, " "); // troca vírgula por espaço

            return (
              <polygon
                key={id}
                points={points}
                fill="transparent"
                stroke="transparent"
                onMouseEnter={() => setHoveredPart({ ...info, img })}
                onMouseLeave={() => setHoveredPart(null)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </svg>
      </div>

      {/* Painel */}
      <div
        className="flex items-center justify-center w-full md:w-[450px] h-[400px] border rounded-lg p-6 shadow-sm bg-[#EAECEC]"
      >
        {hoveredPart ? (
          <div className="text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
              {hoveredPart.name}
            </h2>
            <p className="text-gray-700 mt-3 text-sm sm:text-base md:text-lg leading-relaxed">
              {hoveredPart.description}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center opacity-90">
            <p className="text-gray-600 text-sm sm:text-base">
              Posicione o cursor sobre uma parte do microscópio.
            </p>

            <img
              src="/images/gif1.png"
              alt="Animação microscópio"
              className="mt-4 w-[240px] sm:w-[280px] md:w-[320px] max-h-[260px] object-contain animate-gif-swap"
            />
          </div>
        )}
      </div>
    </div>
  );
}
