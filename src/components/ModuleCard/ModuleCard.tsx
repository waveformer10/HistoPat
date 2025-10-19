import Image from "next/image";
import { ModuleCardProps } from "./ModuleCard.types";

export const ModuleCard: React.FC<ModuleCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="flex flex-col gap-2 group cursor-pointer">
      <div className="overflow-hidden rounded-[8px]">
        <Image
          src={imageSrc}
          alt={title}
          width={364}
          height={170}
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 text-left text-[24px] font-regular text-black">
        {title}
      </h3>
    </div>
  );
};
