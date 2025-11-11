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
                const foundSub = resSub?.data;
                setSubTopic(foundSub);

                if (foundSub?.idTopic) {
                    const resTopic = await findTopicById(foundSub.idTopic);
                    setTopic(resTopic?.data);

                    if (resTopic?.data?.idModule) {
                        const resModule = await findModuleById(resTopic.data.idModule);
                        setModule(resModule?.data);
                    }
                }

                const resSlides = await findSlidesBySubTopicId(subTopicId);
                setSlides(resSlides?.data ?? []);
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
        <div>
            <RouteBar
                routeText={`/${module?.title ?? "Módulo indefinido"}/${topic?.title ?? "Tópico indefinido"}`}
                title={subTopic?.title ?? "Subtópico"}
            />

            <div className="mx-32 mt-56">
                <section className="flex flex-row justify-start w-full gap-16 mb-32">
                    <div className="w-full">
                        <h1 className="text-3xl font-normal text-gray-800 mb-3">
                            {subTopic?.title ?? "Carregando..."}
                        </h1>

                        <p className="text-2xl font-light text-gray-800 mb-3 text-justify">
                            {subTopic?.description ?? "Descrição não disponível."}
                        </p>
                    </div>
                </section>

                <section className="flex flex-col justify-center items-end w-full mb-8">
                    <div className="w-full max-w-sm">
                        <Input
                            isSearch
                            placeholder="Buscar lâmina"
                            value={searchTerm}
                            onChangeValue={setSearchTerm}
                        />
                    </div>
                </section>

                {loading ? (
                    <p className="text-gray-600 text-lg">Carregando lâminas...</p>
                ) : filteredSlides.length > 0 ? (
                    <div className="grid grid-cols-2 gap-6">
                        {filteredSlides.map((slide) => (
                            <SlideCard
                                key={slide.id}
                                id={slide.id}
                                imageSrc={`http://localhost:5047/uploads/${slide.imageUrl}`}
                                title={slide.title}
                                description={slide.description ?? ""}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-lg">Nenhuma lâmina encontrada.</p>
                )}
            </div>
        </div>
    );
}
