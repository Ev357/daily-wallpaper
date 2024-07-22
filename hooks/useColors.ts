import { useColorScheme } from "react-native";
import { colors } from "@/constants/colors";

export const useColors = () => {
  const theme = useColorScheme() ?? "light";

  return colors[theme];
};
