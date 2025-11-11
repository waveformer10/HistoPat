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
    id: "PÉ OU BASE",
    area: { top: 320, left: 20, width: 160, height: 80 },
    info: {
      name: "PÉ OU BASE",
      description: "Sustenta demais peças."
    }
  },
  {
    id: "PARAFUSOS MACROMÉTRICO E MICROMÉTRICO",
    area: { top: 200, left: 180, width: 80, height: 80 },
    info: {
      name: "PARAFUSOS MACROMÉTRICO E MICROMÉTRICO",
      description: "Macrométrico: Permite regular a altura da platina, através de movimentos amplos para um ajuste grosso do foco. Micrométrico: Permite regular a altura da platina, porém é um ajuste fino do foco."
    }
  },
  {
    id: "CHARRIOT",
    area: { top: 20, left: 80, width: 100, height: 120 },
    info: {
      name: "CHARRIOT",
      description: "Sua função é permitir o movimento da lâmina sobre a platina."
    }
  }
  {
    id: "PLATINA",
    area: { top: 320, left: 20, width: 160, height: 80 },
    info: {
      name: "PLATINA",
      description: "Plataforma plana que tem como função suportar o material ou lâmina que está em observação. "
    }
  },
  {
    id: "BRAÇO OU COLUNA",
    area: { top: 200, left: 180, width: 80, height: 80 },
    info: {
      name: "BRAÇO OU COLUNA",
      description: "É fixo na base do microscópio e serve de suporte para as demais partes."
    }
  },
  {
    id: "REVOLVER",
    area: { top: 20, left: 80, width: 100, height: 120 },
    info: {
      name: "REVOLVER",
      description: "Utensílio giratório que acopla as lentes objetivas, modificando o aumento de acordo com o giro."
    }
  },
  {
    id: "TUBO ÓTICO OU CANHÃO",
    area: { top: 320, left: 20, width: 160, height: 80 },
    info: {
      name: "TUBO ÓTICO OU CANHÃO",
      description: "É a estrutura responsável por sustentar as lentes oculares."
    }
  },
  {
    id: "FONTE DE LUZ",
    area: { top: 200, left: 180, width: 80, height: 80 },
    info: {
      name: "FONTE DE LUZ",
      description: "Responsável pela iluminação que permite a observação ideal de suas amostras, bem como a captura de imagens e análise de dados."
    }
  },
  {
    id: "CONDENSADOR E DIAFRAGMA",
    area: { top: 20, left: 80, width: 100, height: 120 },
    info: {
      name: "CONDENSADOR E DIAFRAGMA",
      description: "Diafragma: controla tamanho e intensidade do cone de luz que é projetado sobre o objeto. Condensador: controla o foco e posicionamento da luz sobre a amostra analisada. "
    }
  },
  {
    id: "LENTE OBJETIVA",
    area: { top: 320, left: 20, width: 160, height: 80 },
    info: {
      name: "LENTE OBJETIVA",
      description: "É a lente que fica mais próxima da lâmina e forma uma imagem real do objeto. Apresenta aumentos de: 40x, 100x, 400x e 1000x (necessário óleo de imerção)."
    }
  },
  {
    id: "LENTE OCULAR",
    area: { top: 320, left: 20, width: 160, height: 80 },
    info: {
      name: "LENTE OCULAR",
      description: "É a lente que fica mais próxima do olho e funciona como uma lente de aumento para observar a imagem formada pela objetiva. "
    }
  },
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
