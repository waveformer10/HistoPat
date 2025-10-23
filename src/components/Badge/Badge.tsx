import { BadgeProps } from "./Badge.types";
import { tv } from "tailwind-variants";

const badgeStyles = tv({
  slots: {
    wrapper: "flex items-center justify-center rounded-lg font-semibold",
    textSlot: "", // caso queira estilizar o texto separadamente no futuro
  },
  variants: {
    variant: {
      primary: {
        wrapper: "bg-[#073B59] text-white",
      },
      secondary: {
        wrapper: "bg-white text-[#073B59] border border-[#073B59]",
      },
    },
    size: {
      default: { wrapper: "w-[202px] h-[28px] text-[14px]" },
      small: { wrapper: "w-[100px] h-[24px] text-[12px]" },
      large: { wrapper: "w-[250px] h-[36px] text-[16px]" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export function Badge({ text, variant, size }: BadgeProps) {
  const { wrapper, textSlot } = badgeStyles({ variant, size });
  return <div className={wrapper()}>{text}</div>;
}
