type variantButon = "primary" | "secondary";

export type ButtonProps = {
  onPress: () => void;
  title: string;
  variant: variantButon;
};
