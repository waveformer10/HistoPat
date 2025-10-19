type ButtonVariant = "secondary";

export type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
};
