import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  size?: "sm" | "base" | "lg" | "xl";
};

export const UText = ({
  style,
  lightColor,
  darkColor,
  size = "base",
  ...rest
}: ThemedTextProps) => {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "foreground"
  );

  return <Text style={[{ color }, styles[size], style]} {...rest} />;
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
