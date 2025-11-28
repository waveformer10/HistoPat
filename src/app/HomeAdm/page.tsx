"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { AdmHeader } from "components/AdmHeader/AdmHeader";
import { HighlightCard } from "components/HighlightCard/HighlightCard";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { BeatLoader } from "react-spinners";

import { findUsers } from "service/requests/user/findUsers";
import { findModules } from "service/requests/module/findModules";
import { findTopicsByModuleId } from "service/requests/topic/findTopicsByModuleId";
import { findSlidesBySubTopicId } from "service/requests/slide/findSlidesBySubTopicId";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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


export default function HomeAdm() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [nome, setNome] = useState("");
  const [totalSlides, setTotalSlides] = useState(0);
  const [totalModulos, setTotalModulos] = useState(0);
  const [totalTopicos, setTotalTopicos] = useState(0);
  
  const [pieData, setPieData] = useState({
    labels: [] as string[],
    datasets: [{
      data: [] as number[],
      backgroundColor: ["#5398AC", "#FE5000", "#26406C", "#FFC300", "#900C3F", "#581845"], 
      hoverBackgroundColor: ["#8BC9D6", "#FF9966", "#6C80A8", "#FFE5A0", "#C70039", "#A64A93"]
    }],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const users = await findUsers();
        const mappedUsers = users.map((u: any) => ({ id: u.idUser, nome: u.name }));

        const usuario = mappedUsers.find(u => u.id === id);
        if (usuario) setNome(usuario.nome);

        const modulos = await findModules();
        setTotalModulos(modulos.length);

        let topicosCount = 0;
        let totalSlidesCount = 0;
        const slidesByTopicMap: { [topicName: string]: number } = {};

        for (const modulo of modulos) {
          const topicos = await findTopicsByModuleId(modulo.id);
          topicosCount += topicos.length;

          for (const topico of topicos) {
            const topicName = topico.title || `Tópico ${topico.id}`; 
            
            const slides = await findSlidesBySubTopicId(topico.id);
            const slidesCount = slides.length;
            
            totalSlidesCount += slidesCount;
            
            slidesByTopicMap[topicName] = slidesCount; 
          }
        }
        
        setTotalTopicos(topicosCount);
        setTotalSlides(totalSlidesCount);

        const pieLabels = Object.keys(slidesByTopicMap);
        const pieValues = Object.values(slidesByTopicMap);

        setPieData(prev => ({
          ...prev,
          labels: pieLabels,
          datasets: [{
            ...prev.datasets[0],
            data: pieValues,
          }]
        }));

      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id]);
  
  return (
    <div className="bg-light-gray flex h-screen w-screen flex-1">
      <SideBar
        image="https://novoportal.unipam.edu.br/assets/logo_unipam-2d39776e.png"
        imageCollapsed="https://novoportal.unipam.edu.br/assets/logoWhiteMobile-aef87742.svg"
        collapsible={true}
      >
        <SideBarItem icon="home_icon" title="Início" onClick={() => router.push("/HomeAdm")} />
        <SideBarItem icon="folder_icon" title="Conteúdo" onClick={() => router.push("/PageExample")} />
        <SideBarItem icon="users_icon" title="Usuários" onClick={() => router.push("/Usuarios")} />
      </SideBar>

      <main className="flex-1 p-10 bg-white shadow-md overflow-auto">
        <AdmHeader texto={`Olá, ${nome || "Administrador"}`} />

        {isLoading ? (
          <div className="flex justify-center mt-10">
            <BeatLoader size={10} color="#26406C" />
          </div>
        ) : isError ? (
          <div className="text-red-500 mt-4">
            Erro ao carregar os dados.
            <button 
              onClick={() => window.location.reload()} 
              className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
              <div className="h-44">
                <HighlightCard title="Total de lâminas cadastradas" value={totalSlides} />
              </div>
              <div className="h-44">
                <HighlightCard title="Total de Módulos" value={totalModulos} />
              </div>
              <div className="h-44">
                <HighlightCard title="Total de Tópicos" value={totalTopicos} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
              <div className="flex flex-col items-center justify-center p-6 border rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Total de lâminas por tópico</h2>
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
          </>
        )}
      </main>
    </div>
  );
}