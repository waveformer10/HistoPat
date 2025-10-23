import Image from "next/image";
import { ImagePreviewProps } from "./ImagePreview.types";
import { tv } from "tailwind-variants";

const imagePreviewStyles = tv({
  slots: {
    wrapper: "flex flex-col items-start gap-2",
    imageWrapper: "overflow-hidden rounded-[8px]",
    image: "object-cover",
    fileName: "text-[16px] text-[#FE5000]",
  },
  variants: {
    size: {
      default: {},
      small: {
        imageWrapper: "w-[200px] h-[100px]",
        image: "w-[200px] h-[100px]",
        fileName: "text-[14px]",
      },
      large: {
        imageWrapper: "w-[500px] h-[250px]",
        image: "w-[500px] h-[250px]",
        fileName: "text-[18px]",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc, fileName, size }) => {
  const { wrapper, imageWrapper, image, fileName: fileNameSlot } = imagePreviewStyles({ size });

  return (
    <div className={wrapper()}>
      <div className={imageWrapper()}>
        <Image
          src={imageSrc}
          alt={fileName}
          width={364}
          height={170}
          className={image()}
        />
      </div>
      <span className={fileNameSlot()}>{fileName}</span>
    </div>
  );
};
