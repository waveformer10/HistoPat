"use client";

import { ButtonProps } from "./Button.types";
import { tv } from "tailwind-variants";

const buttonStyles = tv({
  slots: {
    wrapper:
      "bg-dark-blue hover:bg-dark-blue-80 flex w-52 items-center justify-center rounded-sm text-white hover:cursor-pointer",
    text: "!py-2.5",
  },
  variants: {
    color: {
      secondary: {
        wrapper: "bg-white text-black hover:bg-gray-300",
      },
    },
  },
});

export function Button({ onPress, title, variant }: ButtonProps) {
  const { text, wrapper } = buttonStyles({ color: variant });
  return (
    <button className={wrapper()} onClick={onPress}>
      <p className={text()}>{title}</p>
    </button>
  );
}
