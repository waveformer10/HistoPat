"use client";

import { tv } from "tailwind-variants";
import { SlideCardProps } from "./SlideCard.types";
import ZoomImage from "components/ImageZoom/ImageZoom";

const slideCardStyles = tv({
  slots: {
    wrapperSlot:
      "flex flex-col lg:flex-row w-full bg-white rounded-xl p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8 shadow-md transition-all",
    contentSlot:
      "flex flex-col gap-3 sm:gap-4 justify-start w-full text-center lg:text-left",
    titleSlot:
      "font-semibold text-black text-lg sm:text-xl lg:text-2xl leading-tight",
    descriptionSlot:
      "text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed",
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
      <div className="w-full lg:w-[45%] min-w-[200px] relative">
        <ZoomImage
          src={imageSrc}
          alt={title}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      <div className={contentSlot()}>
        <h3 className={titleSlot()}>{title}</h3>
        <p className={descriptionSlot()}>{description}</p>
      </div>
    </div>
  );
};
