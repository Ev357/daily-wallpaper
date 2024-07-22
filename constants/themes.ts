import type { Theme } from "@react-navigation/native";
import { colors } from "@/constants/colors";

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.light.primary,
    background: colors.light.background,
    card: colors.light.card,
    text: colors.light.foreground,
    border: colors.light.border,
    notification: colors.light.destructive,
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.dark.primary,
    background: colors.dark.background,
    card: colors.dark.card,
    text: colors.dark.foreground,
    border: colors.dark.border,
    notification: colors.dark.destructive,
  },
};
