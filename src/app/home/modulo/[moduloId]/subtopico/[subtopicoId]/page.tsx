"use client";

import { useParams } from "next/navigation";
import { Input } from "components/Input/Input";
import { useEffect, useState } from "react";
import { SlideCard } from "components/SlideCard/SlideCard";
import { RouteBar } from "components/RouteBar/RouteBar";

import { findSubTopicById } from "service/requests/subtopic/findSubTopicById";
import { findTopicById } from "service/requests/topic/findTopicById";
import { findModuleById } from "service/requests/module/findModuleById";
import { findSlidesBySubTopicId } from "service/requests/slide/findSlidesBySubTopicId";

import { ISubTopicFind } from "service/@types/subtopic";
import { ITopicFind } from "service/@types/topic";
import { IModuleFind } from "service/@types/module";
import { ISlideFind } from "service/@types/slide";

export default function SubTopicSlides() {
  const params = useParams();
  const subTopicId = Number(params.subtopicoId);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [subTopic, setSubTopic] = useState<ISubTopicFind | null>(null);
  const [topic, setTopic] = useState<ITopicFind | null>(null);
  const [module, setModule] = useState<IModuleFind | null>(null);
  const [slides, setSlides] = useState<ISlideFind[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const resSub = await findSubTopicById(subTopicId);
        const foundSub = resSub;
        setSubTopic(foundSub);

        if (foundSub.id) {
          const resTopic = await findTopicById(foundSub.id);
          setTopic(resTopic);

          if (resTopic?.id) {
            const resModule = await findModuleById(resTopic.id);
            setModule(resModule);
          }
        }

        const resSlides = await findSlidesBySubTopicId(subTopicId);
        setSlides(resSlides ?? []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    if (subTopicId) loadData();
  }, [subTopicId]);

  const filteredSlides =
    slides?.filter((s) =>
      s.title?.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  return (
    <div className="flex flex-col">
      <RouteBar
        routeText={`/${module?.title ?? "Módulo indefinido"}/${topic?.title ?? "Tópico indefinido"}`}
        title={subTopic?.title ?? "Subtópico"}
      />

      <div className="px-8 sm:px-16 md:px-32 lg:px-48 xl:px-64 mt-12 sm:mt-12">
        {/* Descrição do subtópico */}
        <section className="flex flex-col lg:flex-row justify-start w-full gap-8 lg:gap-16 mb-16 lg:mb-16">
          <div className="w-full">
            <h1 className="text-2xl sm:text-3xl font-normal text-gray-800 mb-3 text-center lg:text-left">
              {subTopic?.title ?? "Carregando..."}
            </h1>

            <p className="text-base sm:text-lg lg:text-2xl font-light text-gray-800 mb-3 text-center lg:text-left">
              {subTopic?.description ?? "Descrição não disponível."}
            </p>
          </div>
        </section>

        {/* Campo de busca */}
        <section className="flex flex-col sm:flex-row justify-center sm:justify-end w-full mb-8">
          <div className="w-full sm:w-[60%] md:w-[40%] lg:w-[20%]">
            <Input
              isSearch
              placeholder="Buscar lâmina"
              value={searchTerm}
              onChangeValue={setSearchTerm}
            />
          </div>
        </section>

        {/* Lista de lâminas */}
        {loading ? (
          <p className="text-gray-600 text-center text-lg">
            Carregando lâminas...
          </p>
        ) : filteredSlides.length > 0 ? (
          <div className="grid gap-6 place-items-center">
            {filteredSlides.map((slide) => (
              <SlideCard
                key={slide.id}
                id={slide.id}
                imageSrc={slide.imageUrl}
                title={slide.title}
                description={slide.description ?? ""}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">
            Nenhuma lâmina encontrada.
          </p>
        )}
      </div>
    </div>
  );
}
