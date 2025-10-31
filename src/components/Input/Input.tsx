"use client";

import { tv } from "tailwind-variants";
import { InputProps } from "./Input.types";
import { useState } from "react";
import { IconLib } from "components/IconLib/IconLib";

const inputStyles = tv({
  slots: {
    wrapperSlot: "flex w-full flex-col gap-1.5",
    labelSlot: "font-bold text-gray-900",
    wrapperInputSlot:
      "flex w-full flex-row items-center rounded-md border-2 bg-white",
    inputSlot:
      "flex-1 px-2.5 py-2 text-[14px] leading-tight text-black placeholder-gray-400 outline-none",
    iconLeft: "pl-2.5",
    iconRight: "pr-2.5 active:opacity-60",
  },
  variants: {
    borderColor: {
      primary: {
        wrapperInputSlot: "border-gray-300",
      },
      secondary: {
        wrapperInputSlot: "border-dark-blue",
      },
    },
  },
});

export function Input({
  disabled,
  multiline = false,
  initialRows = 1,
  isPassword = false,
  isSearch,
  label,
  placeholder,
  value,
  onChangeValue,
}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [showValue, setShowValue] = useState(!isPassword);

  const {
    inputSlot,
    labelSlot,
    wrapperSlot,
    wrapperInputSlot,
    iconLeft,
    iconRight,
  } = inputStyles({
    borderColor: isFocus ? "secondary" : "primary",
  });

  function handleFocus() {
    setIsFocus(true);
  }
  function handleBlur() {
    setIsFocus(false);
  }
  function handleShowValue() {
    setShowValue((prev) => !prev);
  }

  return (
    <div className={wrapperSlot()}>
      {label && (
        <label className={labelSlot()} htmlFor={label}>
          {label}
        </label>
      )}

      <div className={wrapperInputSlot()}>
        {isSearch && !disabled && !multiline && (
          <div className={iconLeft()}>
            <IconLib
              iconLibName="io5"
              icon="IoSearch"
              color="var(--color-gray-500)"
              size={25}
            />
          </div>
        )}
        {multiline ? (
          <textarea
            id={label}
            rows={initialRows}
            className={inputSlot()}
            onFocus={handleFocus}
            disabled={disabled}
            placeholder={placeholder}
            onBlur={handleBlur}
            value={value}
            onChange={(text) => onChangeValue(text.target.value)}
            style={{ resize: "none" }}
          />
        ) : (
          <input
            id={label}
            type={showValue ? "text" : "password"}
            placeholder={placeholder}
            className={inputSlot()}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChange={(text) => onChangeValue(text.target.value)}
          />
        )}
        {isPassword && !disabled && !multiline && (
          <button className={iconRight()} onClick={handleShowValue}>
            <IconLib
              iconLibName="lu"
              icon={showValue ? "LuEyeClosed" : "LuEye"}
              color="var(--color-gray-500)"
              fill="var(--color-white)"
              size={25}
            />
          </button>
        )}
      </div>
    </div>
  );
}
