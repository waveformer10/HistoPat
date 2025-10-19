"use client";

import { useState } from "react";
import { tv } from "tailwind-variants";
import { CheckboxProps } from "./Checkbox.types";
import { Icon } from "components/IconSvg/IconSvg";

const checkboxStyles = tv({
  base: `flex cursor-pointer gap-2 select-none`,
});

const boxStyles = tv({
  base: `flex h-6 w-6 items-center justify-center rounded-md border transition-all duration-150`,
  variants: {
    checked: {
      true: "border-(--primary-default) bg-(--primary-default) text-white",
      false: "border-(--neutral-200) bg-transparent",
    },
  },
});

export function Checkbox({
  label = "",
  checked = false,
  onChange,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = () => {
    setIsChecked(!isChecked);
    if (onChange) onChange(!isChecked);
  };

  return (
    <label className={checkboxStyles()} onClick={toggle}>
      <div className={boxStyles({ checked: isChecked })}>
        {isChecked && <Icon size="sm" icon="check_icon" />}
      </div>
      <span className="font-medium text-(--neutral-800)">{label}</span>
    </label>
  );
}
