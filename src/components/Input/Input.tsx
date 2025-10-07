import { tv } from "tailwind-variants";
import { InputProps } from "./Input.types";

const inputStyles = tv({
  base: "",
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
