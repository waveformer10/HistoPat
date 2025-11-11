import { useState } from "react";
import Image from "next/image";
import microscope from "../../../public/images/microscope.png";
import instructionImg from "../../../public/images/instruction.png";

type PartInfo = {
  name: string;
  description: string;
};

const PARTS: { id: string; area: { top: number; left: number; width: number; height: number }; info: PartInfo }[] = [
  {
    id: "base",
    area: { top: 320, left: 20, width: 160, height: 80 },
    info: {
      name: "Base",
      description: "Sustenta o microscópio e garante sua estabilidade."
    }
  },
  {
    id: "focus",
    area: { top: 200, left: 180, width: 80, height: 80 },
    info: {
      name: "Parafuso de foco",
      description: "Permite ajustar o foco da imagem."
    }
  },
  {
    id: "ocular",
    area: { top: 20, left: 80, width: 100, height: 120 },
    info: {
      name: "Ocular",
      description: "Local onde o observador posiciona os olhos."
    }
  }
];

export default function MicroscopeInteractive() {
  const [hoveredPart, setHoveredPart] = useState<PartInfo | null>(null);

  return (
    <div className="flex gap-6 items-center">
      {/* Imagem do microscópio */}
      <div className="relative">
        <Image src={microscope} alt="Microscópio" width={350} />

        {/* Áreas clicáveis */}
        {PARTS.map(({ id, area, info }) => (
          <div
            key={id}
            onMouseEnter={() => setHoveredPart(info)}
            onMouseLeave={() => setHoveredPart(null)}
            style={{
              position: "absolute",
              cursor: "pointer",
              ...area,
              opacity: 0, // deixe 0 para invisível
            }}
          />
        ))}
      </div>

      {/* Painel da direita */}
      <div className="flex items-center justify-center w-[350px] h-[300px] border rounded-lg p-4 bg-gray-50">
        {hoveredPart ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold">{hoveredPart.name}</h2>
            <p className="text-gray-700 mt-2">{hoveredPart.description}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center opacity-75">
            <Image src={instructionImg} alt="Passe o cursor" width={220} />
            <p className="mt-3 text-gray-600">Posicione o cursor sobre uma parte do microscópio.</p>
          </div>
        )}
      </div>
    </div>
  );
}
