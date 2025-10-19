type InputVariant = "primary" | "secondary";

export type InputProps = {
  value: string;
  onChangeValue: (value: string) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  isPassword?: boolean;
  isSearch?: boolean;
  multiline?: boolean;
  initialRows?: number;
};
