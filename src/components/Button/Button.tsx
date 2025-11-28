"use client";

import { ButtonProps } from "./Button.types";
import { tv } from "tailwind-variants";
import { MoonLoader } from "react-spinners";

const buttonStyles = tv({
  slots: {
    wrapper:
      "bg-dark-blue hover:bg-dark-blue-80 flex w-full h-11 items-center justify-center rounded-sm text-white hover:cursor-pointer",
    text: "!py-0",
  },
  variants: {
    color: {
      secondary: {
        wrapper: "bg-white text-black hover:bg-gray-300",
      },
    },
  },
});

export function Button({ onPress, title, variant, isLoading }: ButtonProps) {
  const { text, wrapper } = buttonStyles({ color: variant });

  return (
    <button className={wrapper()} onClick={onPress} disabled={isLoading}>
      {isLoading ? (
        <MoonLoader color="var(--color-white)" size={20} />
      ) : (
        <p className={text()}>{title}</p>
      )}
    </button>
  );
}