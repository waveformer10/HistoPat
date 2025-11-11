"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "components/Input/Input";
import { ModuleCard } from "components/ModuleCard/ModuleCard";
import { useEffect, useState } from "react";
import { findModules } from "service/requests/module/findModules";
import { IModuleFind } from "service/@types/module";
import MicroscopeInteractive  from "components/Microscope/Microscope";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [modules, setModules] = useState<IModuleFind[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModules() {
      try {
        const response = await findModules();
        setModules(response.data);
      } catch (error) {
        console.error("Erro ao buscar módulos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadModules();
  }, []);

  const filteredModules = modules.filter((module) =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

      <section className="relative w-full h-[500px] overflow-hidden">
        <Image
          src="/images/banner.png"
          alt="Microscópio e estudante"
          fill
          className="object-cover"
        />
      </section>

      <div className="!mx-32 !mt-12">
        <section className="flex flex-col justify-center items-start w-full !mb-8">
          <div className="text-left">
            <h1 className="text-[32px] font-normal text-gray-800 mb-3">
              Bem-vindo ao HistoPat - o atlas de histologia da Unipam
            </h1>
            <p className="text-[24px] font-light text-gray-600">
              Explore as lâminas disponíveis na universidade!
            </p>
          </div>
        </section>

        <section className="flex flex-col justify-center items-end w-full !mb-8">
          <div>
            <Input
              isSearch
              placeholder="Buscar aqui"
              value={searchTerm}
              onChangeValue={setSearchTerm}
            />
          </div>
        </section>

        <section className="flex flex-col items-center w-full mx-auto !mb-24">
          {loading ? (
            <p className="text-gray-600 text-lg">Carregando módulos...</p>
          ) : filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center w-full">
              {filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  id={module.id}
                  imageSrc={module.imageUrl}
                  title={module.title}
                  size="medium"
                  theme="light"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">Nenhum módulo encontrado.</p>
          )}
        </section>

        <section className="flex flex-col justify-center items-start w-full !mb-8">
          <div className="text-left">
            <h1 className="text-[32px] font-normal text-gray-800 mb-3">
              Microscópio
            </h1>
            <p className="text-[24px] font-light text-gray-600">
              Entenda a funcionalidade de cada peça do microscópio
            </p>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center w-full !mb-24">
          <MicroscopeInteractive />
        </section>
      </div>

    </div>
  );
}
