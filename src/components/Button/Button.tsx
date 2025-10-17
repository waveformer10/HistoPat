'use client';

import { ButtonProps } from "./Button.types";
import { tv } from "tailwind-variants";

const buttonStyles = tv({
  base: "flex h-14 w-48 items-center justify-center rounded-sm hover:cursor-pointer",
  variants: {
    color: {
      primary: "bg-dark-blue hover:bg-dark-blue-80 text-white",
      secondary: "hover:text-dark-blue bg-white text-black",
    },
  },
});

export function Button({ onPress, title, variant }: ButtonProps) {
  return (
    <button className={buttonStyles({ color: variant })} onClick={onPress}>
      <p>{title}</p>
    </button>
  );
}
