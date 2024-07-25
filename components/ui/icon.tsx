import { useColors } from "@/hooks/useColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import type { ComponentProps } from "react";

export const UIcon = ({
  style,
  ...otherProps
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) => {
  const colors = useColors();

  return (
    <Ionicons style={[{ color: colors.foreground }, style]} {...otherProps} />
  );
};
