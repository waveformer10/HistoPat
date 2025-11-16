import Image from "next/image";
import { ImagePreviewProps } from "./ImagePreview.types";
import { tv } from "tailwind-variants";
import { useEffect, useState } from "react";

const imagePreviewStyles = tv({
  slots: {
    wrapper: "flex flex-col items-start gap-2",
    imageWrapper: "overflow-hidden rounded-[8px]",
    image: "object-contain",
    fileName: "text-[16px] text-[#FE5000]",
  },
  variants: {
    size: {
      default: {},
      small: {
        imageWrapper: "h-[100px] w-[200px]",
        image: "h-[100px] w-[200px]",
        fileName: "text-[14px]",
      },
      large: {
        imageWrapper: "h-[250px] w-[500px]",
        image: "h-[250px] w-[500px]",
        fileName: "text-[18px]",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const fallback = "/images/image_not_valid.png";

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageSrc = fallback,
  fileName,
  size,
}) => {
  const {
    wrapper,
    imageWrapper,
    image,
    fileName: fileNameSlot,
  } = imagePreviewStyles({ size });


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

  return (
    <div className={wrapper()}>
      <div className={imageWrapper()}>
        <Image
          src={imageUrl}
          alt={fileName}
          width={364}
          height={170}
          onError={() => setImageUrl(fallback)}
          className={image()}
        />
      </div>
      <span className={fileNameSlot()}>{fileName}</span>
    </div>
  );
};
