"use client";

import { useRouter } from "next/navigation";
import { IconLib } from "../IconLib/IconLib";
import { ListCardProps } from "./ListCard.types";

export function ListCard(props: ListCardProps) {
  const router = useRouter();

  const handleAction = (action?: string | (() => void)) => {
    if (!action) return;
    if (typeof action === "function") return action();
    router.push(action);
  };

  return (
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
        gap-6 md:gap-10
        outline outline-gray-400 rounded-lg
        font-medium text-gray-900 m-4 py-6 px-4
        min-h-18
      "
    >
      <div className="flex justify-center items-center">
        <p className="bg-dark-blue rounded-full w-14 h-14 flex items-center justify-center text-white text-lg">
          {props.username.at(0)}
        </p>
      </div>
      <p className="flex items-center justify-center text-center truncate">{props.username}</p>
      <p className="flex items-center justify-center text-center">{props.userRole}</p>

      <div className="flex justify-center items-center">
        <button
          className="px-3 py-2 hover:cursor-pointer"
          onClick={() => handleAction(props.editAction)}
        >
          <IconLib
            iconLibName="lu"
            icon="LuPencil"
            color="var(--color-black)"
            fill="var(--color-white)"
            size={23}
          />
        </button>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="px-3 py-2 hover:cursor-pointer"
          onClick={() => handleAction(props.deleteAction)}
        >
          <IconLib
            iconLibName="hi2"
            icon="HiOutlineTrash"
            color="var(--color-black)"
            fill="var(--color-white)"
            size={23}
          />
        </button>
      </div>
    </div>
  );
}
