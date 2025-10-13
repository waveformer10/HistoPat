import { tv } from "tailwind-variants";
import { InputProps } from "./Input.types";

const inputStyles = tv({
  base: "border-light-gray flex h-56 w-lg items-center justify-items-start border-2",
  variants: {
    color: {
      primary: "",
      secondary: "",
    },
  },
});

export function Input({}: InputProps) {
  return <div />;
}
