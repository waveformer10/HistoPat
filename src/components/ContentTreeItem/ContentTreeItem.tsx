"use client";

import {
  useState,
  ReactNode,
  Children,
  isValidElement,
  useEffect,
  useRef,
} from "react";
import { tv } from "tailwind-variants";
import { AllEntityFindTypes, ContentTreeItemProps, entityTypeIconEnum, nextEntityType } from "./ContentTreeItem.types";
import { IconSvg } from "components/IconSvg/IconSvg";
import { selectFindRequest } from "service/utils/selectFindRequest";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { OperationType } from "components/Form/Form.types";
import { appState, SelectedEntityType } from "store/appState";
import { IconLib } from "components/IconLib/IconLib";

const contentTreeItemStyle = tv({
  slots: {
    wrapper: "flex flex-col w-full select-none pb-0.5",
    wrapperRow: "flex flex-row items-center gap-1 cursor-pointer flex-nowrap  ",
    titleSlot: "text-black text-[16px] whitespace-nowrap first-letter:uppercase",
    infoTextSlot: "text-gray-900 text-[14px] whitespace-nowrap",
    addIcon: "flex items-center justify-center p-[2px] rounded-[4px] bg-dark-blue hover:bg-dark-blue-80 cursor-pointer",

    wrapperInfo: "flex flex-row gap-1"
  }
})

export function ContentTreeItem({
  depth = 0,
  defaultOpen = false,
  allowAddButton = false,
  jsxChildren,
  parentPath,
  entityType = "MODULE",
  parentEntityType,
  parentId,
  entityData
}: ContentTreeItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  const selectEntity = appState((state) => state.setSelectedEntity);
  const selectForm = appState((state) => state.setEntityForm);
  const setPath = appState((state) => state.setPath);
  const setIdParentEntityToSave = appState((state) => state.setIdParentEntityToSave);
  const setcloseParentOf = appState((state) => state.setcloseParentOf);
  const closeParentOf = appState((state) => state.closeParentOf);
 

  const paddingLeft = `${depth * 1}rem`;
  const paddingLeftComponent = `${(depth + 1) * 1}rem`

  const { infoTextSlot, titleSlot, wrapper, wrapperRow, addIcon, wrapperInfo } = contentTreeItemStyle();

  const { data = [], isError, isLoading, isRefetching, error, refetch } = useQuery<AllEntityFindTypes[]>({
    queryKey: [`${entityType}`, entityData.id],
    queryFn: () => entityType !== "SLIDE" ? selectFindRequest(entityType, entityData.id) : Promise.resolve([]),
    enabled: entityType !== "SLIDE" && open
  });

  const handleEditClick = () => {
    if (entityType !== "SLIDE") {
      setOpen((prev) => !prev);
    }

    setPath(`${parentPath}`);

    selectForm({
      entityType,
      operation: "EDITAR",
    });

    selectEntity({
      active: entityData.active,
      description: entityData.description,
      createdAt: entityData.createdAt,
      lastModified: entityData.lastModified,
      id: entityData.id,
      title: entityData.title,
      imageUrl: entityData.imageUrl,
      parentEntityType,
      parentId
    });

    setIdParentEntityToSave(undefined);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    selectForm({
      entityType: nextEntityType[entityType],
      operation: "SALVAR",
    });

    selectEntity({} as SelectedEntityType);

    setIdParentEntityToSave(entityData.id);
  };

  const handleClick = (operation: OperationType) => {
    if (entityType !== "SLIDE" && operation === "EDITAR") setOpen((prev) => !prev);

    console.log("entityType", entityType)
    setPath(`${(parentPath)}`);

    if (operation === "EDITAR") {
      selectForm({
        entityType,
        operation,
      });

      selectEntity({
        active: entityData.active,
        description: entityData.description,
        createdAt: entityData.createdAt,
        lastModified: entityData.lastModified,
        id: entityData.id,
        title: entityData.title,
        imageUrl: entityData.imageUrl,
        parentEntityType,
        parentId
      });

      setIdParentEntityToSave(undefined);
    } else {
      selectForm({
        entityType: nextEntityType[entityType],
        operation,
      });

      selectEntity({} as SelectedEntityType);
      setIdParentEntityToSave(entityData.id);
    }
  };

  useEffect(() => {
    if (!closeParentOf) return;

    if (entityData.id === closeParentOf) {
      console.log("EXECUTOU FECHANDO TUDO")
      setOpen(false);
      setcloseParentOf(undefined);
    }
  }, [closeParentOf]);

  return (
    <div className={wrapper()} style={{ paddingLeft }}>
      <div
        className={wrapperRow()}
        onClick={handleEditClick}
      >

        {entityType !== "SLIDE" &&
          <div className={`transition-transform duration-200 ${open ? "rotate-90" : ""} pl-0.5`}>
            <IconSvg size="sm" icon="arrow_icon" color="black" />
          </div>}


        <div className="flex-shrink-0">
          <IconSvg icon={entityTypeIconEnum[entityType]} color="black" size="md" />
        </div>
        <p className={titleSlot()}>{entityData.title}</p>
        {entityType !== "SLIDE" && (
          <button
            className={addIcon()}
            onClick={(e) => {
              handleAddClick(e);
            }}
          >
            <IconSvg size="sm" icon="plus_icon" color="white" />
          </button>
        )}
      </div>

      {open && (
        <div className="flex flex-col">
          {isLoading ? (
            <div className={infoTextSlot()} style={{ paddingLeft: paddingLeftComponent }}><BeatLoader size={2} /></div>
          ) : isError ? (
            <div
              className={wrapperInfo()}
              style={{ paddingLeft: paddingLeftComponent }}
            >
              <IconLib
                iconLibName="md"
                icon="MdErrorOutline"
                color="var(--color-gray-900)"
                size={20}
              />
              <p className={infoTextSlot()}>Não foi possível buscar os itens</p>
            </div>
          ) : data.length === 0 ? (
            <div
              className={wrapperInfo()}
              style={{ paddingLeft: paddingLeftComponent }}
            >
              <IconLib
                iconLibName="md"
                icon="MdSearchOff"
                color="var(--color-gray-900)"
                size={20}
              />
              <p className={infoTextSlot()}>Nenhum item encontrado</p>
            </div>) :
            (
              data.map((item) => (
                <ContentTreeItem
                  key={item.id}
                  {...item}
                  depth={depth + 1}
                  entityData={item}
                  parentId={entityData.id}
                  parentEntityType={entityType}
                  entityType={nextEntityType[entityType]}
                  parentPath={`${parentPath}\\${item.title}`}
                />
              ))
            )}
        </div>
      )}
    </div>
  );
}
