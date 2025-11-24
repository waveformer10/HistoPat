"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Input } from "components/Input/Input";
import { Accordion } from "components/Accordion/Accordion";
import { useEffect, useState } from "react";

import { findModuleById } from "service/requests/module/findModuleById";
import { findTopicsByModuleId } from "service/requests/topic/findTopicsByModuleId";
import { findSubTopicsByTopicId } from "service/requests/subtopic/findSubTopicsByTopicId";

import { IModuleFind } from "service/@types/module";
import { ITopicFind } from "service/@types/topic";
import { ISubTopicFind } from "service/@types/subtopic";
import { RouteBar } from "components/RouteBar/RouteBar";

export default function Topico() {
  const router = useRouter();
  const params = useParams();
  const moduleId = Number(params.moduloId);

  const [searchTerm, setSearchTerm] = useState("");
  const [module, setModule] = useState<IModuleFind | null>(null);
  const [accordions, setAccordions] = useState<
    { title: string; items: { id: number; title: string }[] }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const responseModule = await findModuleById(moduleId);
        setModule(responseModule.data);

        const responseTopics = await findTopicsByModuleId(moduleId);

        const accordionsData = await Promise.all(
          responseTopics.map(async (topic: ITopicFind) => {
            const responseSub = await findSubTopicsByTopicId(topic.id);
            return {
              title: topic.title,
              items: responseSub.map((st: ISubTopicFind) => ({
                id: st.id,
                title: st.title,
              })),
            };
          })
        );

        setAccordions(accordionsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    if (moduleId) loadData();
  }, [moduleId]);

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
    <div className="w-full">
      <RouteBar routeText="" title={module?.title ?? "Módulo"} />

      <div className="px-8 sm:px-16 md:px-32 lg:px-48 xl:px-64 mt-12 sm:mt-24 md:mt-24">
        {/* Seção do módulo */}
        <section className="flex flex-col md:flex-row justify-start items-center md:items-start w-full gap-8 md:gap-16 mb-16">
          <div className="w-full sm:w-[400px] flex-shrink-0">
            {module?.imageUrl && (
              <Image
                className="rounded-2xl w-full h-auto object-cover shadow-sm"
                src={module.imageUrl}
                alt={module?.title ?? "Imagem do módulo"}
                width={400}
                height={250}
                priority
              />
            )}
          </div>

          <div className="w-full md:max-w-[600px] text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
              {module?.title ?? "Título do módulo"}
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light text-gray-700 text-center lg:text-left">
              {module?.description ?? "Descrição não disponível"}
            </p>
          </div>
        </section>

        {/* Campo de busca */}
        <section className="flex flex-col sm:flex-row justify-center sm:justify-end w-full mb-8">
          <div className="w-full sm:w-[60%] md:w-[40%] lg:w-[20%]">
            <Input
              isSearch
              placeholder="Buscar tópico"
              value={searchTerm}
              onChangeValue={setSearchTerm}
            />
          </div>
        </section>

        {/* Acordeões */}
        {loading ? (
          <p className="text-gray-600 text-lg text-center sm:text-left">
            Carregando tópicos...
          </p>
        ) : filteredAccordions.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredAccordions.map((acc, index) => (
              <Accordion key={index} title={acc.title} items={acc.items} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg text-center sm:text-left">
            Nenhum tópico encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
