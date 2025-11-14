"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "components/Input/Input";
import { ModuleCard } from "components/ModuleCard/ModuleCard";
import { useEffect, useState } from "react";
import { findModules } from "service/requests/module/findModules";
import { IModuleFind } from "service/@types/module";
import MicroscopeInteractive from "components/Microscope/Microscope";

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
    <div className="flex flex-col w-full overflow-hidden">

      {/* Banner Responsivo */}
      <section
        className="w-full h-[250px] sm:h-[400px] md:h-[500px] bg-no-repeat bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/banner.png')",
          backgroundSize: "contain"   // 👈 substitui bg-[length:100%_auto]
        }}
      />

      {/* Conteúdo Principal */}
      <div className="px-8 sm:px-16 md:px-32 lg:px-48 xl:px-64 mt-8 sm:mt-12">

        {/* Texto de Boas-vindas */}
        <section className="flex flex-col lg:flex-row justify-start w-full gap-8 lg:gap-16 mb-12 lg:mb-12">
          <div className="w-full">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 text-center lg:text-left">
              Bem-vindo ao HistoPat — o atlas de histologia da Unipam
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl font-light text-gray-800 mb-3 text-center lg:text-left">
              Explore as lâminas disponíveis na universidade!
            </p>
          </div>
        </section>

        {/* Campo de Busca */}
        <section className="flex flex-col sm:flex-row justify-end w-full mb-8">
          <div className="w-full sm:w-[60%] md:w-[40%] lg:w-[20%]">
            <Input
              isSearch
              placeholder="Buscar módulo"
              value={searchTerm}
              onChangeValue={setSearchTerm}
            />
          </div>
        </section>

        {/* Módulos */}
        <section className="flex flex-col items-center w-full mx-auto mb-24">
          {loading ? (
            <p className="text-gray-600 text-lg">Carregando módulos...</p>
          ) : filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
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

        {/* Seção do Microscópio */}
        <section className="flex flex-col justify-center items-start w-full mb-8 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
            Microscópio
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-600">
            Entenda a funcionalidade de cada peça do microscópio
          </p>
        </section>

        {/* Componente do Microscópio */}
        <section className="flex flex-col justify-center items-center w-full mb-24">
          <MicroscopeInteractive />
        </section>
      </div>
    </div>
  );
}
