"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Checkbox } from "components/Checkbox/Checkbox";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { IconSvg } from "components/IconSvg/IconSvg";

export default function NovoUsuario() {
  const router = useRouter();
  const pathname = usePathname();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [nivelMaster, setNivelMaster] = useState(false);
  const [nivelAdmin, setNivelAdmin] = useState(false);

  const handleSalvar = () => {
    const novoUsuario = {
      id: Math.floor(Math.random() * 10000),
      nome,
      login,
      senha,
      cargo: nivelMaster ? "Master" : nivelAdmin ? "Administrador" : "Normal",
    };

    alert(`Usuário "${nome}" criado com sucesso!`);
    router.push("/Usuarios");
  };

  return (
    <div className="bg-light-gray flex h-screen w-screen">
      <SideBar
        image="https://novoportal.unipam.edu.br/assets/logo_unipam-2d39776e.png"
        imageCollapsed="https://novoportal.unipam.edu.br/assets/logoWhiteMobile-aef87742.svg"
        collapsible
      >
        <SideBarItem
          icon="home_icon"
          title="Início"
          onClick={() => router.push("/HomeAdm")}
        />
        <SideBarItem
          icon="folder_icon"
          title="Conteúdo"
          onClick={() => router.push("/PageExample")}
        />
        <SideBarItem
          icon="users_icon"
          title="Usuários"
          selected
          onClick={() => router.push("/Usuarios")}
        />
      </SideBar>

      <main className="flex-1 flex flex-col bg-white shadow-sm overflow-y-auto">
        <div className="p-8 pb-3 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">
            Criar Novo Usuário
          </h1>

          <div className="w-12 h-12 rounded-full bg-dark-blue flex items-center justify-center text-white text-xl font-medium">
            +
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6 relative max-w-xl">
          <button
            onClick={() => router.push("/Usuarios")}
            className="absolute right-6 top-0 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <IconSvg icon="arrow_icon" size="md" color="#444" />
          </button>
          <section className="flex flex-col gap-5 w-full max-w-xl">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-700">Nome Completo</p>
              <div className="h-[48px]">
                <Input
                  value={nome}
                  onChangeValue={setNome}
                  placeholder="Digite o nome completo"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-700">Login</p>
              <div className="h-[48px]">
                <Input
                  value={login}
                  onChangeValue={setLogin}
                  placeholder="Digite o login do usuário"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-700">Senha</p>
              <div className="h-[48px]">
                <Input
                  value={senha}
                  onChangeValue={setSenha}
                  placeholder="Digite a senha"
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3 max-w-xl">
            <p className="text-sm font-medium text-gray-700">Nível de usuário</p>

            <div className="flex gap-6">
              <Checkbox
                label="Master"
                checked={nivelMaster}
                onChange={() => {
                  setNivelMaster(true);
                  setNivelAdmin(false);
                }}
              />

              <Checkbox
                label="Administrador"
                checked={nivelAdmin}
                onChange={() => {
                  setNivelAdmin(true);
                  setNivelMaster(false);
                }}
              />
            </div>
          </section>

          <div className="flex justify-end max-w-xl">
            <Button onPress={handleSalvar} title="Criar" />
          </div>

        </div>
      </main>
    </div>
  );
}
