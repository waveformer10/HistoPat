"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { ListCard } from "components/ListCard/ListCard";
import { AdmHeader } from "components/AdmHeader/AdmHeader";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";

import { useQuery } from "@tanstack/react-query";
import { http } from "service/requests/http";
import { queryKeys } from "service/@types/queryKeys";
import { IUserFind } from "service/@types/user";
import { BeatLoader } from "react-spinners";

export default function Usuarios() {
  const router = useRouter();
  const pathname = usePathname();

  const [busca, setBusca] = useState("");
/*
  const usuarios = [
    { id: 1, nome: "Marcelo Almeida", cargo: "Administrador", login: "marceloalmeida", senha: "********" },
    { id: 2, nome: "Ana Beatriz Souza", cargo: "Normal", login: "anasouza", senha: "********" },
    { id: 3, nome: "Lucas Pereira", cargo: "Administrador", login: "lucaspereira", senha: "********" },
    { id: 4, nome: "João Silva", cargo: "Normal", login: "joaosilva", senha: "********" },
  ];
*/
  const { data: usuarios, isLoading, isError, refetch } = useQuery<IUserFind[]>({
    queryKey: [queryKeys.ALL_USERS],
    queryFn: http.user.findUsers,
  });

  const usuariosFiltrados = (usuarios ?? []).filter((u) =>
    u.name.toLowerCase().includes(busca.toLowerCase())
  );

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
          onClick={() => {
            if (pathname !== "/PageExample") {
              router.push("/PageExample");
            }
          }}
        />
        <SideBarItem
          icon={"users_icon"}
          title="Usuários"
          selected={true}
          onClick={() => {
            if (pathname !== "/Usuarios") {
              router.push("/Usuarios");
            }
          }}
        />
      </SideBar>

      <main className="flex-1 p-10 bg-white rounded-tl-2xl shadow-md">
        <AdmHeader texto="Usuários" />
        
        <div className="flex items-center justify-between mb-6 gap-4">
          <Input 
            value={busca}
            onChangeValue={setBusca}
            placeholder="Buscar usuário..."
          />
          <Button
            onPress={() => router.push("/Usuarios/Novo")}
            title="Novo Usuário"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center mt-4"><BeatLoader size={10} /></div>
        ) : isError ? (
          <div className="text-red-500 mt-4">
            Não foi possível carregar os usuários.
            <Button onPress={refetch} title="Tentar Novamente" />
          </div>
        ) : usuariosFiltrados && usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((user) => (
            <ListCard
              key={user.idUser} 
              username={user.name}
              userRole={user.active ? "Ativo" : "Inativo"}
              editAction={`/Usuarios/Editar/${user.idUser}`}
              deleteAction={() => alert(`Deletar ${user.name}`)}
            />
          ))
        ) : (
          <p className="text-gray-500 mt-4">Nenhum usuário encontrado.</p>
        )}
      </main>
    </div>
  );
}
