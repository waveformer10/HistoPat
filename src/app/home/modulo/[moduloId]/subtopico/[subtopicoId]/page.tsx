"use client";

import { useRouter, useParams } from "next/navigation";
import { Input } from "components/Input/Input";
import { useEffect, useState } from "react";
import { SlideCard } from "components/SlideCard/SlideCard";

import { findSubTopicsByTopicId } from "service/requests/subtopic/findSubTopicsByTopicId";
import { findSlidesBySubTopicId } from "service/requests/slide/findSlidesBySubTopicId";

import { ISubTopicFind } from "service/@types/subtopic";
import { ISlideFind } from "service/@types/slide";

export default function SubTopicSlides() {
    const params = useParams();
    const subTopicId = Number(params.subtopicoId);

    console.log("🔹 params:", params);
    console.log("🔹 subTopicId extraído:", subTopicId);


    const [searchTerm, setSearchTerm] = useState("");
    const [subTopic, setSubTopic] = useState<ISubTopicFind | null>(null);
    const [slides, setSlides] = useState<ISlideFind[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            console.log("▶️ loadData executando...");

            try {
                const responseSub = await findSubTopicsByTopicId(subTopicId);
                console.log("✅ responseSub:", responseSub);

                console.log("✅ responseSub.data:", responseSub?.data);

                const found = responseSub?.data?.find(
                    (item: ISubTopicFind) => item.id === subTopicId
                );

                console.log("🔎 SubTopic encontrado:", found);

                setSubTopic(found ?? null);

                const responseSlides = await findSlidesBySubTopicId(subTopicId);
                console.log("✅ responseSlides:", responseSlides);
                console.log("✅ responseSlides.data:", responseSlides?.data);

                setSlides(responseSlides.data ?? []);
            } catch (error) {
                console.error("❌ Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
                console.log("⏹ Finalizou o loadData");
            }
        }

        if (subTopicId) {
            loadData();
        } else {
            console.warn("⚠️ subTopicId não encontrado!");
        }
    }, [subTopicId]);

    const filteredSlides =
        slides?.filter((s) =>
            s.title?.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];

    console.log("📌 subtópico final:", subTopic);
    console.log("📌 slides finais:", slides);
    console.log("📌 slides filtrados:", filteredSlides);

    return (
        <div>
            {/* HEADER */}
            <section className="bg-[#26406C] w-full mb-32 flex items-center">
                <h1 className="text-3xl font-semibold text-white p-12">
                    Laminário patológico
                </h1>
            </section>

            {/* CONTAINER */}
            <div className="mx-32 mt-12">

                {/* TÍTULO + DESCRIÇÃO */}
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

                {/* INPUT BUSCA */}
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

                {/* LISTA */}
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
