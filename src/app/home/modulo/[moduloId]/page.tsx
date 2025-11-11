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
          responseTopics.data.map(async (topic: ITopicFind) => {
            const responseSub = await findSubTopicsByTopicId(topic.id);

            return {
              title: topic.title,
              items: responseSub.data.map((st: ISubTopicFind) => ({
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
    <div>

      <RouteBar routeText="" title={module?.title ?? "Módulo"} />

      <div className="!mx-32 !mt-56">

        <section className="flex flex-row justify-center w-full gap-16 !mb-16">

          <Image
            className="w-128 h-68 rounded-2xl"
            src={`http://localhost:5047/uploads/${module?.imageUrl}`}
            alt={module?.title ?? "Imagem do módulo"}
            width={400}
            height={250}
          />

          <div className="max-w-128">
            <h1 className="text-[32px] font-normal text-gray-800 mb-3">
              {module?.title ?? "Título do módulo"}
            </h1>

            <p className="text-[24px] font-light text-gray-800 mb-3 !text-justify">
              {module?.description ?? "Descrição não disponível"}
            </p>
          </div>
        </section>

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

        {loading ? (
          <p className="text-gray-600 text-lg">Carregando tópicos...</p>
        ) : filteredAccordions.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredAccordions.map((acc, index) => (
              <Accordion key={index} title={acc.title} items={acc.items} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">Nenhum tópico encontrado.</p>
        )}
      </div>

    </div>
  );
}
