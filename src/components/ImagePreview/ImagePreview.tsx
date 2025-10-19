import Image from "next/image";
import { ImagePreviewProps } from "./ImagePreview.types";

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc, fileName }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="overflow-hidden rounded-[8px]">
        <Image
          src={imageSrc}
          alt={fileName}
          width={364}
          height={170}
          className="object-cover"
        />
      </div>
      <span className="text-[16px] text-[#FE5000]">{fileName}</span>
    </div>
  );
};
