"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";

import { Checkbox } from "components/Checkbox/Checkbox";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { Input } from "components/Input/Input";
import { AdmHeader } from "components/AdmHeader/AdmHeader";
import { Button } from "components/Button/Button";

const usuarios = [
  { id: 1, nome: "Marcelo Almeida", cargo: "Administrador", login: "marceloalmeida", senha: "********" },
  { id: 2, nome: "Ana Beatriz Souza", cargo: "Normal", login: "anasouza", senha: "********" },
  { id: 3, nome: "Lucas Pereira", cargo: "Administrador", login: "lucaspereira", senha: "********" },
  { id: 4, nome: "João Silva", cargo: "Normal", login: "joaosilva", senha: "********" },
];

export default function EditarUsuario() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const id = Number(params?.id);

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [nivelMaster, setNivelMaster] = useState(false);
  const [nivelAdmin, setNivelAdmin] = useState(false);

  useEffect(() => {
    const usuario = usuarios.find((u) => u.id === id);
    if (usuario) {
      setNome(usuario.nome);
      setLogin(usuario.login);
      setSenha(usuario.senha);
      setNivelAdmin(usuario.cargo === "Administrador");
      setNivelMaster(usuario.cargo === "Master");
    }
  }, [id]);

  const handleSalvar = () => {
    console.log("Salvando alterações...");
    console.table({ id, nome, login, senha, nivelMaster, nivelAdmin });
    alert(`Usuário "${nome}" atualizado com sucesso!`);
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
        <AdmHeader texto={`Editar Usuário ${nome}`} />
        <div>
          <div>
            <p className="text-lg font-light text-gray-600">Nome Completo</p>
            <Input value={nome} onChangeValue={setNome} />
          </div>
          <div>
            <p className="text-lg font-light text-gray-600">Login</p>
            <Input value={login} onChangeValue={setLogin} />
          </div>
          <div>
            <p className="text-lg font-light text-gray-600">Senha</p>
            <Input value={senha} onChangeValue={setSenha} />
          </div>

          <div>
            <p className="text-lg font-light text-gray-600 mb-2">
              Nível de usuário
            </p>
            <div className="flex gap-4">
              <Checkbox
                label="Master"
                checked={nivelMaster}
                onChange={() => setNivelMaster(!nivelMaster)}
              />
              <Checkbox
                label="Administrador"
                checked={nivelAdmin}
                onChange={() => setNivelAdmin(!nivelAdmin)}
              />
            </div>
          </div>
          <Button
            onPress={handleSalvar}
            title="Salvar"
          />
        </div>
      </main>
    </div>
  );
}
