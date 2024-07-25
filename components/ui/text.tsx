import { Text, type TextProps, StyleSheet } from "react-native";
import { useColors } from "@/hooks/useColors";

export type UTextProps = TextProps & {
  size?: "sm" | "base" | "lg" | "xl";
};

export const UText = ({ style, size = "base", ...otherProps }: UTextProps) => {
  const colors = useColors();

  return (
    <Text
      style={[{ color: colors.foreground }, styles[size], style]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 28,
  },
});
