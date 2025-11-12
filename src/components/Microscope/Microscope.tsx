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
    id: "BASE",
    area: { top: 300, left: 50, width: 200, height: 100 },
    info: {
      name: "BASE",
      description: "Sustenta todo o microscópio."
    }
  },
  {
    id: "PLATINA",
    area: { top: 260, left: 70, width: 180, height: 60 },
    info: {
      name: "PLATINA",
      description: "Superfície onde o material é colocado."
    }
  },
  {
    id: "BRAÇO / COLUNA",
    area: { top: 120, left: 220, width: 80, height: 200 },
    info: {
      name: "BRAÇO OU COLUNA",
      description: "Suporta as partes superiores do microscópio."
    }
  },
  {
    id: "AJUSTE MACRO",
    area: { top: 160, left: 200, width: 100, height: 80 },
    info: {
      name: "PARAFUSO MACROMÉTRICO",
      description: "Ajuste grosseiro de foco."
    }
  },
  {
    id: "CABO / FONTE DE LUZ",
    area: { top: 140, left: 150, width: 100, height: 60 },
    info: {
      name: "CABO / ILUMINAÇÃO",
      description: "Fornece energia ao sistema."
    }
  },
  {
    id: "OBJETIVA",
    area: { top: 120, left: 100, width: 100, height: 80 },
    info: {
      name: "LENTES OBJETIVAS",
      description: "Lentes próximas ao objeto observado."
    }
  },
  {
    id: "TUBO ÓTICO",
    area: { top: 50, left: 120, width: 140, height: 90 },
    info: {
      name: "TUBO ÓTICO",
      description: "Estrutura que conecta as objetivas às oculares."
    }
  },
  {
    id: "OCULAR",
    area: { top: 0, left: 70, width: 200, height: 80 },
    info: {
      name: "LENTES OCULARES",
      description: "Lentes próximas aos olhos do observador."
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
      <div className="flex items-center justify-center w-[550px] h-[500px] border rounded-lg p-4 bg-gray-50">
        {hoveredPart ? (
          <div className="text-center">
            <h2 className="text-xl text-gray-900 font-semibold">{hoveredPart.name}</h2>
            <p className="text-gray-700 mt-2">{hoveredPart.description}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center opacity-75">
            <p className="mt-3 text-gray-600">Posicione o cursor sobre uma parte do microscópio.</p>
            <Image src={instructionImg} alt="Passe o cursor" width={320} />
          </div>
        )}
      </div>
    </div>
  );
}
