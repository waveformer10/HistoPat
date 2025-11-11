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
        <div className="min-h-screen flex flex-col bg-white text-gray-900">

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

        </div>
    );
}
