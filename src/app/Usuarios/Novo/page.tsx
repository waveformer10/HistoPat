"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Checkbox } from "components/Checkbox/Checkbox";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { IconSvg } from "components/IconSvg/IconSvg";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "service/requests/http";
import { queryKeys } from "service/@types/queryKeys";
import toast from "react-hot-toast";
import { IRoleFind } from "service/@types/role";
import { IUserSave } from "service/@types/user";
import { AxiosError } from "axios";
import { IconLib } from "components/IconLib/IconLib";

export default function NovoUsuario() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [roleSelected, setRoleSelected] = useState<number>();
  const [validateErrors, setValidateErrors] = useState<{ Name: string, UserName: string, Password: string }>({} as { Name: string, UserName: string, Password: string });

  const saveUserMutation = useMutation({
    mutationFn: http.user.saveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_USERS] });
      toast.success("Usuário cadastrado", {
        position: "bottom-right",
      });
      router.push("/Usuarios");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (
          error.status === 400 &&
          error.response?.data.title ===
          "One or more validation errors occurred."
        ) {
          setValidateErrors(error.response.data.errors);
          return;
        }
      }
      toast.error("Erro ao salvar usuário", {
        position: "bottom-right",
      });
    },
  });

  const { data = [], isError, isPending, isLoading, refetch } = useQuery<IRoleFind[]>({
    queryKey: queryKeys.ALL_ROLES,
    queryFn: http.role.findRoles,
  })

  console.log("ROLES", data)

  const handleSalvar = () => {

    const novoUsuarioParaBackend: IUserSave = {
      name: nome,
      password: senha,
      userName: login,
      roleId: roleSelected,
      active: true,
    };

    saveUserMutation.mutate(novoUsuarioParaBackend);


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
        <div className="p-8 pb-3 flex items-center flex-row gap-2.5">
          <button
            onClick={() => router.push("/Usuarios")}
            style={{ cursor: 'pointer' }}
          >
            <IconLib iconLibName="go" icon="GoArrowLeft" color="#000" size={30} />
          </button>
          <h1 className="text-3xl font-semibold text-gray-800">
            Criar Novo Usuário
          </h1>

        </div>

        <div className="p-6 flex flex-col gap-6 relative max-w-xl">

          <section className="flex flex-col gap-5 w-full max-w-xl">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-700">Nome Completo</p>
              <div className="h-[48px]">
                <Input
                  value={nome}
                  onChangeValue={setNome}
                  placeholder="Digite o nome completo"
                  errorMessage={validateErrors.Name}
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
                  errorMessage={validateErrors.UserName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-700">Senha</p>
              <div className="h-[48px]">
                <Input
                  isPassword
                  value={senha}
                  onChangeValue={setSenha}
                  placeholder="Digite a senha"
                  errorMessage={validateErrors.Password}
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3 max-w-xl">
            <p className="text-sm font-medium text-gray-700">Nível de usuário</p>

            <div className="flex gap-6">
              {data.map((item, index) => (
                <Checkbox
                  key={item.idRole}
                  label={item.name}
                  checked={roleSelected === item.idRole}
                  onSelect={() => setRoleSelected(item.idRole)}
                />
              ))}
            </div>
          </section>
          <Button onPress={handleSalvar} title={saveUserMutation.isPending ? "Criando..." : "Criar"} />
        </div>
      </main>
    </div>
  );
}
