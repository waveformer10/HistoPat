"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "components/Input/Input";
import { ModuleCard } from "components/ModuleCard/ModuleCard";
import { useState } from "react";

export default function Home() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white relative z-10">
                <div className="flex items-center gap-3 h-20">
                    <Image className="!m-8"
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

                <section className=" flex flex-row justify-start w-full gap-16 !mb-32">
                    <div className="w-full">
                        <h1 className="text-[32px] font-normal text-gray-800 mb-3">Esteatose</h1>
                        <p className="text-[24px] font-light text-gray-800 mb-3 !text-justify"> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                    </div>
                </section>

                {/* Input alinhado à direita */}
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

            </div>

            {/* Footer */}
            <footer className="bg-[#26406C] text-white text-center text-sm py-6 mt-auto">
                © 2025 Centro Universitário de Patos de Minas - UNIPAM. Todos os direitos reservados.
            </footer>
        </div>
    );
}
