import { libs } from "./IconLib";

export type LibNames = keyof typeof libs;
export type IconLibs = typeof libs;
type LibIconNames<T extends LibNames> = keyof IconLibs[T];

export type IconLibProps<T extends LibNames> = {
  iconLibName: T;
  icon: LibIconNames<T>;
  color: string;
  size: number;
  fill?: string;
};
