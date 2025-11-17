"use client";

import { useEffect, useState } from "react";

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
import Form from "components/Form/Form";
import { EntityType } from "components/Form/Form.types";
import { appState, SelectedEntityType } from "store/appState";
import { IconLib } from "components/IconLib/IconLib";
import { tv } from "tailwind-variants";
import { Button } from "components/Button/Button";
import { BeatLoader } from "react-spinners";

const painelStyles = tv({
  slots: {
    infoTextSlot: "text-gray-900 text-[14px] whitespace-nowrap",
    wrapperInfo: "flex-1 flex flex-col gap-1 items-center justify-center"
  }
})

export default function SideBarExample() {
  const { infoTextSlot, wrapperInfo } = painelStyles();
  const router = useRouter();
  const pathname = usePathname();

  const selectEntity = appState((state) => state.setSelectedEntity);
  const setPath = appState((state) => state.setPath);

  const [entityType, setEntityType] = useState<EntityType>("MODULE");

  const { data = [], isError, isPending, isLoading, refetch } = useQuery<IModuleFind[]>({
    queryKey: queryKeys.ALL_MODULES,
    queryFn: http.module.findModules,
  })

  useEffect(() => {
    if (data.length > 0) {
      console.log("MUDOU")
      selectEntity({
        active: data[0].active,
        createdAt: data[0].createdAt,
        title: data[0].title,
        description: data[0].description,
        id: data[0].id,
        imageUrl: data[0].imageUrl,
        lastModified: data[0].lastModified,
      });

      setPath(data[0].title);
    }
  }, [data])

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
          selected={true}
          onClick={() => {
            if (pathname !== "/PageExample") {
              router.push("/PageExample");
            }
          }}
        />
        <SideBarItem
          icon={"users_icon"}
          title="Usuários"
          selected={false}
          onClick={() => router.push("/Usuarios")}
        />
      </SideBar>
      <SideBar colorNavigation="secondary" title="Estrutura do conteúdo">
        {isLoading ?
          <div className={wrapperInfo()}><BeatLoader size={10} /></div>
          : isError ?
            <div className={wrapperInfo()}>
              <IconLib
                iconLibName="md"
                icon="MdErrorOutline"
                color="var(--color-gray-900)"
                size={20}
              />
              <p className={infoTextSlot()}>Não foi possível buscar os itens</p>
              <Button
                title="Buscar"
                onPress={refetch}
              />
            </div>
            : data.length === 0 ?
              <div className={wrapperInfo()}>
                <IconLib
                  iconLibName="md"
                  icon="MdSearchOff"
                  color="var(--color-gray-900)"
                  size={20}
                />
                <p className={infoTextSlot()}>Nenhum item encontrado</p>
                <Button
                  title="Buscar"
                  onPress={refetch}
                />
              </div>
              : data.map((item, index) => (
                <ContentTreeItem
                  key={item.id}
                  entityData={item}
                  parentPath={item.title}
                  allowAddButton
                  defaultOpen={index === 0}
                  entityType={entityType}
                />
              )
              )}
      </SideBar>
      <main className="flex-1">
        <Form />
      </main>
    </div>
  );
}
