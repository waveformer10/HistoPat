export type BadgeVariant = "primary" | "secondary";
export type BadgeSize = "default" | "small" | "large";

export type BadgeProps = {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
};
