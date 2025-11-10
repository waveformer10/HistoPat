"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "components/Input/Input";
import { Accordion } from "components/Accordion/Accordion";
import { useEffect, useState } from "react";
import { findTopicsByModuleId } from "service/requests/topic/findTopicsByModuleId";
import { findSubTopicsByTopicId } from "service/requests/subtopic/findSubTopicsByTopicId";
import { ITopicFind } from "service/@types/topic";
import { ISubTopicFind } from "service/@types/subtopic";

export default function Topico() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleId = Number(searchParams.get("moduleId"));
  const [searchTerm, setSearchTerm] = useState("");
  const [accordions, setAccordions] = useState<{ title: string; items: { title: string }[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      if (!moduleId) return;

      try {
        const { data: topics } = await findTopicsByModuleId(moduleId);

        // Para cada tópico, buscar subtópicos
        const accordionsData = await Promise.all(
          topics.map(async (topic: ITopicFind) => {
            const { data: subtopics } = await findSubTopicsByTopicId(topic.id);
            return {
              title: topic.title,
              items: subtopics.map((sub: ISubTopicFind) => ({ title: sub.title })),
            };
          })
        );

        setAccordions(accordionsData);
      } catch (error) {
        console.error("Erro ao buscar tópicos/subtópicos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [moduleId]);

  // 🔍 Filtragem dinâmica
  const filteredAccordions = accordions
    .map((acc) => ({
      ...acc,
      items: acc.items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (acc) =>
        acc.items.length > 0 ||
        acc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white relative z-10">
        <div className="flex items-center gap-3 h-20">
          <Image
            className="!m-8"
            src="/images/logos.png"
            alt="Logos FEPAM e UNIPAM"
            width={160}
            height={40}
          />
        </div>
        <nav className="flex gap-6 text-sm text-gray-600 !m-8">
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

      <section className="bg-[#26406C] w-full h-full items-center !mb-32">
        <h1 className="text-[32px] font-semibold text-white !p-12">
          Laminário patológico
        </h1>
      </section>

      <div className="!mx-32 !mt-12">
        <section className="flex flex-row justify-center w-full gap-16 !mb-16">
          <Image
            className="w-128 h-68 rounded-2xl"
            src="/images.jpeg"
            alt="Imagem módulo"
            width={160}
            height={40}
          />
          <div className="max-w-128">
            <h1 className="text-[32px] font-normal text-gray-800 mb-3">
              Tópicos do módulo
            </h1>
            <p className="text-[24px] font-light text-gray-800 mb-3 !text-justify">
              Explore os tópicos e sub-tópicos relacionados a este módulo.
            </p>
          </div>
        </section>

        {/* Input alinhado à direita */}
        <section className="flex flex-col justify-center items-end w-full !mb-8">
          <div>
            <Input
              isSearch
              placeholder="Buscar tópico ou subtópico"
              value={searchTerm}
              onChangeValue={setSearchTerm}
            />
          </div>
        </section>

        {/* Accordions dinâmicos */}
        {loading ? (
          <p className="text-gray-600 text-lg">Carregando tópicos...</p>
        ) : filteredAccordions.length > 0 ? (
          filteredAccordions.map((acc, index) => (
            <Accordion key={index} title={acc.title} items={acc.items} />
          ))
        ) : (
          <p className="text-gray-500 text-lg">Nenhum tópico encontrado.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#26406C] text-white text-center text-sm py-6 mt-auto">
        © 2025 Centro Universitário de Patos de Minas - UNIPAM. Todos os direitos reservados.
      </footer>
    </div>
  );
}
