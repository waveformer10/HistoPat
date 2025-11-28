"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { AdmHeader } from "components/AdmHeader/AdmHeader";

import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { HighlightCard } from "components/HighlightCard/HighlightCard";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const pieData = {
  labels: ["Anatomia", "Laminário Histológico", "Laminário Patológico"],
  datasets: [
    {
      data: [30, 30, 22],
      backgroundColor: ["#5398AC", "#FE5000", "#26406C"],
      hoverBackgroundColor: ["#8BC9D6", "#FF9966", "#6C80A8"],
    },
  ],
};

const barLabels = ["Lâmina 01", "Lâmina 02", "Lâmina 03", "Lâmina 04"];
const barValues = [32, 45, 12, 50];

const combinado = barLabels.map((label, index) => ({
  label,
  value: barValues[index],
}));

const ordenado = combinado.sort((a, b) => b.value - a.value);

const barData = {
  labels: ordenado.map((item) => item.label),
  datasets: [
    {
      label: "Acessos",
      data: ordenado.map((item) => item.value),
      backgroundColor: "#26406C",
      hoverBackgroundColor: "#6C80A8",
      borderRadius: 6,
    },
  ],
};

const usuarios = [
  { id: 1, nome: "Marcelo Almeida", cargo: "Administrador", login: "marceloalmeida", senha: "********" },
  { id: 2, nome: "Ana Beatriz Souza", cargo: "Normal", login: "anasouza", senha: "********" },
  { id: 3, nome: "Lucas Pereira", cargo: "Administrador", login: "lucaspereira", senha: "********" },
  { id: 4, nome: "João Silva", cargo: "Normal", login: "joaosilva", senha: "********" },
];

export default function HomeAdm() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [nome, setNome] = useState("");

  useEffect(() => {
    const usuario = usuarios.find((u) => u.id === id);
    if (usuario) setNome(usuario.nome);
  }, [id]);

  return (
    <div className="bg-light-gray flex h-screen w-screen flex-1">
      <SideBar
        image="https://novoportal.unipam.edu.br/assets/logo_unipam-2d39776e.png"
        imageCollapsed="https://novoportal.unipam.edu.br/assets/logoWhiteMobile-aef87742.svg"
        collapsible={true}
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
          onClick={() => router.push("/Usuarios")}
        />
      </SideBar>

      <main className="flex-1 p-10 bg-white shadow-md overflow-auto">

        <AdmHeader texto={`LAUANE GONZAGA E SILVA`} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">

          <div className="h-44">
            <HighlightCard title="Total de lâminas cadastradas" value={1080} />
          </div>

          <div className="h-44">
            <HighlightCard title="Total de Módulos" value={3} />
          </div>

          <div className="h-44">
            <HighlightCard title="Total de Tópicos" value={30} />
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">

          <div className="flex flex-col items-center justify-center p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Total de lâminas por tópico
            </h2>
            <div className="w-72 h-72">
              <Pie data={pieData} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Lâminas Mais Acessadas
            </h2>
            <div className="w-full h-72">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
