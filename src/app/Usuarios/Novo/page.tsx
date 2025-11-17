"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Checkbox } from "components/Checkbox/Checkbox";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "service/requests/http";
import { queryKeys } from "service/@types/queryKeys";

export default function NovoUsuario() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [nivelMaster, setNivelMaster] = useState(false);
  const [nivelAdmin, setNivelAdmin] = useState(false);

  const saveUserMutation = useMutation({
    mutationFn: http.user.saveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_USERS] });
      router.push("/Usuarios");
    },
    onError: (error) => {
      console.error("Erro ao salvar usuário:", error);
    },
  });

  const handleSalvar = () => {
    const idRoles: number[] = [];
    if (nivelMaster) idRoles.push(1);
    if (nivelAdmin) idRoles.push(2);

    const novoUsuarioParaBackend = {
      name: nome,
      active: true,
      idRoles: idRoles.length > 0 ? idRoles : undefined,
    };

    saveUserMutation.mutate(novoUsuarioParaBackend);
    //-------------------------------------------------------
    const novoUsuario = {
      id: Math.floor(Math.random() * 10000),
      nome,
      login,
      senha,
      cargo: nivelMaster ? "Master" : nivelAdmin ? "Administrador" : "Normal",
    };

    console.table(novoUsuario);
    alert(`Usuário "${nome}" criado com sucesso!`);
    router.push("/Usuarios");
  };

  return (
    <div className="bg-light-gray flex h-screen w-screen flex-1">
      <SideBar
        image="https://novoportal.unipam.edu.br/assets/logo_unipam-2d39776e.png"
        imageCollapsed="https://novoportal.unipam.edu.br/assets/logoWhiteMobile-aef87742.svg"
        collapsible={true}
      >
        <SideBarItem
          icon={"home_icon"}
          title="Início"
          selected={false}
          onClick={() => router.push("/")}
        />
        <SideBarItem
          icon={"folder_icon"}
          title="Conteúdo"
          selected={false}
          onClick={() => router.push("/PageExample")}
        />
        <SideBarItem
          icon={"users_icon"}
          title="Usuários"
          selected={true}
          onClick={() => router.push("/Usuarios")}
        />
      </SideBar>

      <main className="flex-1 p-10 bg-white rounded-tl-2xl shadow-md">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Criar Novo Usuário
          </h1>

          <div className="w-12 h-12 rounded-full bg-dark-blue flex items-center justify-center text-white text-xl font-medium">
            +
          </div>
        </div>

        <div>
          <p className="text-lg font-light text-gray-600">Nome Completo</p>
          <Input value={nome} onChangeValue={setNome} placeholder="Digite o nome completo" />
        </div>

        <div>
          <p className="text-lg font-light text-gray-600">Login</p>
          <Input value={login} onChangeValue={setLogin} placeholder="Digite o login do usuário" />
        </div>

        <div>
          <p className="text-lg font-light text-gray-600">Senha</p>
          <Input
            value={senha}
            onChangeValue={setSenha}
            placeholder="Digite a senha"
            label="password"
          />
        </div>

        <div>
          <p className="text-lg font-light text-gray-600 mb-2">Nível de usuário</p>
          <div className="flex gap-4">
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
        </div>

        <Button onPress={handleSalvar} title={saveUserMutation.isPending ? "Criando..." : "Criar"} />
      </main>
    </div>
  );
}
