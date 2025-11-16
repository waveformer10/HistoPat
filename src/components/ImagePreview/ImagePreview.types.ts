export type ImagePreviewSize = "default" | "small" | "large";

export interface ImagePreviewProps {
  imageSrc?: string;
  fileName: string;
  size?: ImagePreviewSize;
}
