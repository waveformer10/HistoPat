"use client";

import { tv } from "tailwind-variants";
import { SlideCardProps } from "./SlideCard.types";
import ZoomImage from "components/ImageZoom/ImageZoom";

const slideCardStyles = tv({
  slots: {
    wrapperSlot:
      "flex w-full bg-white rounded-xl p-3 gap-4 shadow-sm",
    contentSlot: "flex flex-col gap-2",
    titleSlot: "font-semibold text-black text-lg",
    descriptionSlot: "text-sm text-gray-700",
  },
});

export const SlideCard: React.FC<SlideCardProps> = ({
  id,
  imageSrc,
  title,
  description,
}) => {
  const { wrapperSlot, contentSlot, titleSlot, descriptionSlot } =
    slideCardStyles({});

  return (
    <div className={wrapperSlot()}>

      <div className="w-[45%] min-w-[240px] relative">
        <ZoomImage src={imageSrc} alt={title} className="rounded-lg" />
      </div>

      <div className={contentSlot()}>
        <h3 className={titleSlot()}>{title}</h3>
        <p className={descriptionSlot()}>{description}</p>
      </div>
    </div>
  );
};
