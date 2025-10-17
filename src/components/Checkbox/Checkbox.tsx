'use client';

import { useState } from "react";
import { tv } from "tailwind-variants";
import { CheckboxProps } from "./Checkbox.types";
import { Icon } from "components/Icon/Icon";

const checkboxStyles = tv({
  base: `
    flex gap-2 cursor-pointer select-none
  `,
});

const boxStyles = tv({
  base: `
    w-6 h-6 flex items-center justify-center rounded-md border
    transition-all duration-150
  `,
  variants: {
    checked: {
      true: "bg-(--primary-default) border-(--primary-default) text-white",
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
        {isChecked && (
          <Icon
            size="sm"
            icon="check_icon"
          />
        )}
      </div>
      <span className="text-(--neutral-800) font-medium">{label}</span>
    </label>
  );
}
