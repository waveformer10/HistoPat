import { BadgeProps } from "./Badge.types";
import { tv } from "tailwind-variants";

const badgeStyles = tv({
  base: "flex items-center justify-center rounded-lg font-semibold",
  variants: {
    color: {
      primary: "bg-[#073B59] text-white",
      secondary: "bg-white text-[#073B59] border border-[#073B59]",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export function Badge({ text, variant }: BadgeProps) {
  return (
    <div
      className={badgeStyles({ color: variant })}
      style={{
        width: "202px",
        height: "28px",
        fontSize: "14px",
      }}
    >
      {text}
    </div>
  );
}
