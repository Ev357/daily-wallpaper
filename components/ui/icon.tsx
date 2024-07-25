import { useColors } from "@/hooks/useColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import type { ComponentProps } from "react";

export type UIconProps = IconProps<ComponentProps<typeof Ionicons>["name"]>;

export const UIcon = ({ style, ...otherProps }: UIconProps) => {
  const colors = useColors();

  return (
    <Ionicons style={[{ color: colors.foreground }, style]} {...otherProps} />
  );
};
