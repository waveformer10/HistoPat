"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { Checkbox } from "components/Checkbox/Checkbox";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { Input } from "components/Input/Input";
import { AdmHeader } from "components/AdmHeader/AdmHeader";
import { Button } from "components/Button/Button";
import { IconSvg } from "components/IconSvg/IconSvg";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "service/requests/http";
import { queryKeys } from "service/@types/queryKeys";
import { IconSvg } from "components/IconSvg/IconSvg";

const usuarios = [
  { id: 1, nome: "Marcelo Almeida", cargo: "Administrador", login: "marceloalmeida", senha: "********" },
  { id: 2, nome: "Ana Beatriz Souza", cargo: "Normal", login: "anasouza", senha: "********" },
  { id: 3, nome: "Lucas Pereira", cargo: "Administrador", login: "lucaspereira", senha: "********" },
  { id: 4, nome: "João Silva", cargo: "Normal", login: "joaosilva", senha: "********" },
];

export default function EditarUsuario() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const queryClient = useQueryClient();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [nivelMaster, setNivelMaster] = useState(false);
  const [nivelAdmin, setNivelAdmin] = useState(false);

  const { data: usuario, isLoading } = useQuery<any>({
    queryKey: [queryKeys.USER_BY_ID, id],
    queryFn: () => http.user.findUserById(id),
    enabled: !!id,
    select: (res: any) => Array.isArray(res) ? res[0] : res.data,
  });

  useEffect(() => {
    console.log("Dados do usuário carregados:", usuario);
    if (usuario) {
      setNome(usuario.name ?? "");
      setNivelMaster(usuario.idRoles?.includes(1) ?? false);
      setNivelAdmin(usuario.idRoles?.includes(2) ?? false);
    }
  }, [usuario, id]);

  const editUserMutation = useMutation({
    mutationFn: http.user.editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_USERS] });
      router.push("/Usuarios");
    },
    onError: (err) => {
      console.error("Erro ao editar usuário:", err);
      alert("Erro ao salvar");
    }
  });

  const handleSalvar = () => {
    alert(`Usuário "${nome}" atualizado com sucesso!`);
    router.push("/Usuarios");
  };

  if (isLoading) {
    return <p className="p-8">Carregando usuário...</p>;
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
        <div className="p-8 pb-3">
          <AdmHeader texto="Editar Usuário" />
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
              <p className="text-sm font-medium text-gray-700">Nome</p>
              <div className="h-[48px]">
                <Input value={nome} onChangeValue={setNome} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-700">Login</p>
              <div className="h-[48px]">
                <Input value={login} onChangeValue={setLogin} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-700">Senha</p>
              <div className="h-[48px]">
                <Input value={senha} onChangeValue={setSenha} />
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
            <Button title="Salvar" onPress={handleSalvar} />
          </div>
        </div>
      </main>
    </div>
  );
}