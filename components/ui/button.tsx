import {
  type StyleProp,
  TouchableOpacity,
  type ViewStyle,
  type TouchableOpacityProps,
} from "react-native";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";
import { forwardRef, type LegacyRef } from "react";

export const UButton = forwardRef(
  (
    {
      style,
      variant = "default",
      ...otherProps
    }: TouchableOpacityProps & {
      variant?: "default" | "outline";
    },
    ref: LegacyRef<TouchableOpacity>
  ) => {
    const colors = useColors();

    return (
      <TouchableOpacity
        ref={ref}
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
  }
);
