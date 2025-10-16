import { tv } from "tailwind-variants";
import { InputProps } from "./Input.types";

const inputStyles = tv({
  base: "text-black",
  slots: {
    wrapperSlot: "flex flex-col justify-items-start",
    labelSlot: "text-dark-gray",
    wrapperInputSlot:
      "border-light-gray flex h-14 w-2xs flex-row items-center justify-center rounded-sm border-2",
    inputSlot:
      "placeholder-light-gray ml-2 h-full w-full bg-amber-100 text-black outline-none",
  },
  variants: {
    borderColor: {
      secondary: {
        wrapperInputSlot: "border-dark-blue",
      },
    },
  },
});

export function Input({
  disabled,
  isMultiple,
  isPassword,
  isSearch,
  label,
  placeholder,
  borderStyle,
}: InputProps) {
  const { inputSlot, labelSlot, wrapperSlot, wrapperInputSlot } = inputStyles({
    borderColor: borderStyle,
  });

  return (
    <div className={wrapperSlot()}>
      <p className={labelSlot()}>Título</p>
      <div className={wrapperInputSlot({ borderColor: borderStyle })}>
        <input className={inputSlot()} type="text" />
      </div>
    </div>
  );
}
