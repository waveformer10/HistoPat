type ButtonVariant = "primary" | "secondary";

export type ButtonProps = {
  onPress: () => void;
  title: string;
  variant: ButtonVariant;
};
