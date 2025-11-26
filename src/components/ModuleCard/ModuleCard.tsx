"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { tv } from "tailwind-variants";
import { ModuleCardProps } from "./ModuleCard.types";
import { useEffect, useState } from "react";

const moduleCardStyles = tv({
  slots: {
    wrapperSlot: "flex flex-col gap-2 group cursor-pointer w-full",
    imageWrapperSlot:
      "relative overflow-hidden rounded-[8px] w-full aspect-[16/9]",
    imageSlot:
      "object-cover transition-transform duration-300 ease-in-out group-hover:scale-105",
    titleSlot: "mt-3 text-left font-semibold text-black",
  },
  variants: {
    size: {
      small: {
        imageWrapperSlot: "aspect-[4/3]",
        titleSlot: "text-[18px]",
      },
      medium: {
        imageWrapperSlot: "aspect-[16/9]",
        titleSlot: "text-[22px]",
      },
      large: {
        imageWrapperSlot: "aspect-[21/9]",
        titleSlot: "text-[26px]",
      },
    },
    theme: {
      light: {
        titleSlot: "text-black",
      },
      dark: {
        titleSlot: "text-white",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    theme: "light",
  },
});

const fallback = "/images/image_not_valid.png";

export const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  imageSrc,
  title,
  size,
  theme,
}) => {
  const { wrapperSlot, imageWrapperSlot, imageSlot, titleSlot } =
    moduleCardStyles({ size, theme });

  const router = useRouter();

  const handleClick = () => {
    router.push(`/home/modulo/${id}`);
  };

  const [imageUrl, setImageUrl] = useState(
    imageSrc && imageSrc.startsWith("http")
      ? imageSrc
      : fallback
  );

  useEffect(() => {
    if (!imageSrc) {
      setImageUrl(fallback);
      return;
    }

    setImageUrl(
      imageSrc.startsWith("http") ? imageSrc : fallback
    );
  }, [imageSrc]);

  console.log("IMAGE SRC =>", imageSrc);

  return (
    <div className={wrapperSlot()} onClick={handleClick}>
      <div className={imageWrapperSlot()}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={imageSlot()}
          onError={() => setImageUrl(fallback)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <h3 className={titleSlot()}>{title}</h3>
    </div>
  );
};
