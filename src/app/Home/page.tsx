"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "components/Input/Input";
import { ModuleCard } from "components/ModuleCard/ModuleCard";
import { useEffect, useState } from "react";
import { getModules } from "../../services/modulesService";
import { Module } from "../../interfaces/modules";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getModules();
        setModules(data);
      } catch (error) {
        console.error("Erro ao buscar módulos:", error);
      }
    };

    fetchModules();
  }, []);

  return (
    // Fundo branco aplicado aqui
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white relative z-10">
        <div className="flex items-center gap-3 h-20">
          <Image
            className="m-8"
            src="/images/logos.png"
            alt="Logos FEPAM e UNIPAM"
            width={160}
            height={40}
          />
        </div>
        <nav className="flex gap-6 text-sm text-gray-600 m-8">
          <button
            onClick={() => router.push("/")}
            className="hover:underline transition"
          >
            Início
          </button>
          <button
            onClick={() => router.push("/login")}
            className="hover:underline transition"
          >
            Log in
          </button>
        </nav>
      </header>

      {/* Hero Banner */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <Image
          src="/images/banner.png"
          alt="Microscópio e estudante"
          fill
          className="object-cover"
        />
      </section>

      {/* Conteúdo pós-banner */}
      <main className="mx-32 mt-12 flex-1">
        <section className="flex flex-col justify-center items-start w-full mb-8">
          <div className="text-left">
            <h1 className="text-[32px] font-normal text-gray-800 mb-3">
              Bem-vindo ao HistoPat - o atlas de histologia da Unipam
            </h1>
            <p className="text-[24px] font-light text-gray-600">
              Explore as lâminas disponíveis na universidade!
            </p>
          </div>
        </section>

        {/* Input alinhado à direita */}
        <section className="flex flex-col justify-center items-end w-full mb-8">
          <div>
            <Input
              isSearch
              placeholder="Buscar aqui"
              value={searchTerm}
              onChangeValue={setSearchTerm}
            />
          </div>
        </section>

        {/* Cards */}
        <section className="flex flex-col w-full mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center w-full">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                id={module.id}
                imageSrc={
                  module.moduleImages && module.moduleImages.length > 0
                    ? module.moduleImages[0].filePath
                    : "/images/default.png"
                }
                title={module.title}
                size="medium"
                theme="light"
              />
            ))}
          </div>
        </section>


        <section className="flex flex-col justify-center items-start w-full mb-8">
          <div className="text-left">
            <h1 className="text-[32px] font-normal text-gray-800 mb-3">
              Microscópio
            </h1>
            <p className="text-[24px] font-light text-gray-600">
              Entenda a funcionalidade de cada peça do microscópio
            </p>
          </div>
        </section>

        <section className="flex flex-col justify-center items-start w-full mb-8">
          <Image
            className="rounded-2xl"
            src="/images/microscopioMockup.png"
            alt="Microscópio"
            width={380}
            height={80}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#26406C] text-white text-center text-sm py-6">
        © 2025 Centro Universitário de Patos de Minas - UNIPAM. Todos os direitos reservados.
      </footer>
    </div>
  );
}
