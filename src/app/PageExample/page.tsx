"use client";

import { useState } from "react";

import { Checkbox } from "components/Checkbox/Checkbox";
import { ContentTreeItem } from "components/ContentTreeItem/ContentTreeItem";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useRouter, usePathname } from "next/navigation";
import ContentTreePath from "components/ContentTreePath/ContentTreePath";
import { queryKeys } from "service/@types/queryKeys";
import { http } from "service/requests/http";
import { IModuleFind } from "service/@types/module";
import { useSubTopicsByTopicId } from "hooks/useSubTopicsByTopicId";
import { ContentTreeItemProps } from "components/ContentTreeItem/ContentTreeItem.types";

export default function SideBarExample() {
  const router = useRouter();
  const pathname = usePathname();

  const [content, setContent] = useState<string | null>(null);
  const [moduleSelected, setModuleSelected] = useState<number>();
  const [topicSelected, setTopicSelected] = useState<number>();
  const [subTopicSelected, setSubTopicSelected] = useState<number>();
  const [slideSelected, setSlideSelected] = useState<number>();
  const [entityType, setEntityType] = useState<EntityType>("MODULE");

  const { data, isError, isPending, isLoading } = useQuery<IModuleFind[]>({
    queryKey: queryKeys.ALL_MODULES,
    queryFn: http.module.findModules,
  })

  const { data: subTopicData, isError: isErrorSubTopic, isPending: isPendingSubTopic, isLoading: isLoadingSubTopic } = useSubTopicsByTopicId(topicSelected);

  console.log("DATA", data);

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
          selected={true}
          onClick={() => {
            if (pathname !== "/PageExample") {
              router.push("/PageExample");
            }
          }}
        />
      </SideBar>
      <SideBar colorNavigation="secondary" title="Estrutura do conteúdo">
        {data?.map((item, index) => {
          const topics = item.Topics.map((item, index): ContentTreeItemProps => {
            return {
              title: item.title,
              allowAddButton: true,
              onSelect: () => setTopicSelected(index),
            }
          })
          return (
            <ContentTreeItem
              title={item.title}
              icon="folder_icon"
              allowAddButton
              defaultOpen={index === 0}
              onSelect={(title) => setContent(title)}
              selectedTitle={content ?? ""}
              children={[]}
            />
          )
        })}
        {/* <ContentTreeItem
          title="Laminário Patológico"
          icon="folder_icon"
          defaultOpen={true}
          allowAddButton
          onSelect={(title) => setContent(title)}
          selectedTitle={content ?? ""}
          children={[
            {
              title: "Estômago",
              icon: "list_icon",
              defaultOpen: false,
              allowAddButton: true,
            },
            {
              title: "Fígado",
              icon: "list_icon",
              allowAddButton: true,
              children: [
                {
                  title: "Esteatose",
                  icon: "collection_icon",
                  allowAddButton: true,
                  children: [
                    {
                      title: "Lâmina 001",
                      icon: "file_icon",
                      allowAddButton: false,
                    },
                  ],
                },
              ],
            },
          ]}
        /> */}
      </SideBar>
      <main className="flex-1">
        {/* <h1 className="text-4xl font-bold">
                    {content !== null ? `Conteúdo Selecionado: ${content}` : "Nenhum Conteúdo Selecionado"}
                </h1>
                <Checkbox
                        label="Master"
                        checked={true}
                        onChange={(checked) => console.log("Novo estado:", checked)}
                    />
                <Checkbox
                    label="Administrador"
                    checked={true}
                    onChange={(checked) => console.log("Novo estado:", checked)}
                /> */}
        <Form type={entityType} operation="EDITAR" />
      </main>
    </div>
  );
}
