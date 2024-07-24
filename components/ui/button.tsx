import {
  type StyleProp,
  TouchableOpacity,
  type ViewStyle,
  type TouchableOpacityProps,
} from "react-native";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";

export const UButton = ({
  style,
  variant = "default",
  ...otherProps
}: TouchableOpacityProps & {
  variant?: "default" | "outline";
}) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: spacing[2],
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
        },
        (
          {
            default: {
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.primary,
            },
            outline: {
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.background,
            },
          } satisfies Record<typeof variant, StyleProp<ViewStyle>>
        )[variant],
        style,
      ]}
      {...otherProps}
    />
  );
};
