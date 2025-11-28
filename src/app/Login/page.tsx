"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { http } from "service/requests/http";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [validateErrors, setValidateErrors] = useState<{ Password: string, UserName: string }>({} as { Password: string, UserName: string });

  async function handleSalvar() {
    setIsLoading(true);
    try {
      const res = await http.user.login({ UserName: userName, Password: password });

      console.log("RESPOSTA LOGIN", res);
      router.push("/HomeAdm")

      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsLoading(false);
        if (error.status === 412) {
          toast.error(error.response?.data?.message, {
            position: "bottom-right",
          });

          return;
        }
        if (
          error.status === 400 &&
          error.response?.data.title ===
          "One or more validation errors occurred."
        ) {
          setValidateErrors(error.response.data.errors);
          return;
        }
      }
      toast.error("Erro ao logar", {
        position: "bottom-right",
      });
    }
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
              value={userName}
              onChangeValue={setUserName}
              placeholder="Digite seu usuário"
              errorMessage={validateErrors.UserName}
            />
          </div>

          <div className="flex flex-col gap-1 text-left">
            <p className="text-base font-medium text-gray-700">Senha</p>
            <Input
              isPassword
              value={password}
              onChangeValue={setPassword}
              placeholder="Digite sua senha"
              errorMessage={validateErrors.Password}
            />
          </div>
        </section>

        <Button onPress={handleSalvar} title="Entrar" isLoading={isLoading} />
      </main>
    </div>
  );
}
