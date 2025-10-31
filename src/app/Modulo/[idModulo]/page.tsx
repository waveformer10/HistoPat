"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "components/Input/Input";
import { Accordion } from "components/Accordion/Accordion";

import { getModuleById } from "../../../services/modulesService";
import { topic } from "../../../interfaces/topic";
import { subTopic } from "../../../interfaces/subTopic";

interface Module {
    id: number;
    title: string;
    description?: string;
    image?: string;
    topics?: topic[];
}

export default function ModuloPage() {
    const { idModulo } = useParams();
    const [modulo, setModulo] = useState<Module | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchModulo() {
            try {
                const data = await getModuleById(Number(idModulo));

                setModulo({
                    ...data,
                    description: data.description
                });
            } catch (err) {
                console.error("Erro ao carregar módulo:", err);
            }
        }

        fetchModulo();
    }, [idModulo]);

    if (!modulo) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <p className="text-gray-700 text-lg">Carregando módulo...</p>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen flex flex-col">
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
                    <button onClick={() => (window.location.href = "/")} className="hover:underline transition">
                        Início
                    </button>
                    <button onClick={() => (window.location.href = "/login")} className="hover:underline transition">
                        Log in
                    </button>
                </nav>
            </header>

            {/* Seção título principal */}
            <section className="bg-[#26406C] w-full h-full items-center !mb-32">
                <h1 className="text-[32px] font-semibold text-white !p-12">Laminário patológico</h1>
            </section>

            <div className="!mx-32 !mt-12">
                {/* Imagem + título do módulo */}
                <section className="flex flex-row justify-center w-full gap-16 !mb-16">
                    <Image
                        className="rounded-lg object-cover"
                        src={modulo.image ? `http://localhost:5047${modulo.image}` : "/images/default.png"}
                        alt={modulo.title}
                        width={400}
                        height={260}
                    />
                    <div className="max-w-128">
                        <h1 className="text-[32px] font-normal text-gray-800 mb-3">{modulo.title}</h1>
                        <p className="text-[24px] font-light text-gray-800 mb-3 !text-justify">{modulo.description}</p>
                    </div>
                </section>

                {/* Campo de busca */}
                <section className="flex flex-col justify-center items-end w-full !mb-8">
                    <div>
                        <Input
                            isSearch
                            placeholder="Buscar tópico..."
                            value={searchTerm}
                            onChangeValue={setSearchTerm}
                        />
                    </div>
                </section>

                {/* Accordions dinâmicos */}
                <section className="!mb-12">
                    {modulo.topics
                        ?.filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((topico: topic) => (
                            <div key={topico.id} className="mb-4"> {/* <--- margem inferior adicionada */}
                                <Accordion
                                    title={topico.title}
                                    items={topico.subTopics?.map((s: subTopic) => ({ title: s.title })) || []}
                                />
                            </div>
                        ))}
                </section>

            </div>

            {/* Footer */}
            <footer className="bg-[#26406C] text-white text-center text-sm py-6 mt-auto">
                © 2025 Centro Universitário de Patos de Minas - UNIPAM. Todos os direitos reservados.
            </footer>
        </div>
    );
}
