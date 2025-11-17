"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { ListCard } from "components/ListCard/ListCard";
import { AdmHeader } from "components/AdmHeader/AdmHeader";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";

export default function Usuarios() {
  const router = useRouter();
  const pathname = usePathname();

  const [busca, setBusca] = useState("");

  const usuarios = [
    { id: 1, nome: "Marcelo Almeida", cargo: "Administrador", login: "marceloalmeida", senha: "********" },
    { id: 2, nome: "Ana Beatriz Souza", cargo: "Normal", login: "anasouza", senha: "********" },
    { id: 3, nome: "Lucas Pereira", cargo: "Administrador", login: "lucaspereira", senha: "********" },
    { id: 4, nome: "João Silva", cargo: "Normal", login: "joaosilva", senha: "********" },
  ];

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
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
          onClick={() => router.push("/HomeAdm")}
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

      <main className="flex-1 p-10 bg-white shadow-md">
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

        {usuariosFiltrados.map((user) => (
          <ListCard
            key={user.id}
            username={user.nome}
            userRole={user.cargo}
            editAction={`/Usuarios/Editar/${user.id}`}
            deleteAction={() => alert(`Deletar ${user.nome}`)}
          />
        ))}

        {usuariosFiltrados.length === 0 && (
          <p className="text-gray-500 mt-4">Nenhum usuário encontrado.</p>
        )}
      </main>
    </div>
  );
}
