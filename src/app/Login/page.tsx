"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";

export default function Login() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleSalvar = () => {
    router.push("/home");
  };

  return (
    <div className="bg-white dark:bg-white flex h-screen w-screen items-center justify-center p-4">
      <main className="rounded-xl px-10 py-12 w-full max-w-md flex flex-col items-center text-center gap-8">
        <div className="flex items-center justify-center gap-4">
          <img
            src="/images/logo-histopat.png"
            alt="logo"
            className="h-22 w-auto object-contain"
          />
          <img
            src="/images/logo_unipam.png"
            alt="logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800">
          Acesse sua Conta
        </h1>

        <section className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1 text-left">
            <p className="text-base font-medium text-gray-700">Usuário</p>
            <Input
              value={nome}
              onChangeValue={setNome}
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="flex flex-col gap-1 text-left">
            <p className="text-base font-medium text-gray-700">Senha</p>
            <Input
              value={senha}
              onChangeValue={setSenha}
              placeholder="Digite sua senha"
            />
          </div>
        </section>

        <p className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
          Esqueceu sua senha?
        </p>

        <Button onPress={handleSalvar} title="Entrar" />
      </main>
    </div>
  );
}
