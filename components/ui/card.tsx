import { View, type ViewProps } from "react-native";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";
import { UText } from "@/components/ui/text";

export const UCard = ({ style, ...otherProps }: ViewProps) => {
  const colors = useColors();

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: spacing[2],
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export const UCardContent = ({ style, ...otherProps }: ViewProps) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: spacing[6],
          paddingBottom: spacing[6],
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export const UCardDescription = ({ style, ...otherProps }: ViewProps) => {
  const colors = useColors();

  return (
    <UText
      size="sm"
      style={[{ color: colors.mutedForeground }, style]}
      {...otherProps}
    />
  );
};

export const UCardFooter = ({ style, ...otherProps }: ViewProps) => {
  return (
    <View
      style={[
        {
          alignItems: "center",
          paddingHorizontal: spacing[6],
          paddingBottom: spacing[6],
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export const UCardHeader = ({ style, ...otherProps }: ViewProps) => {
  return (
    <View
      style={[
        {
          rowGap: spacing["1.5"],
          padding: spacing[6],
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export const UCardTitle = ({ style, ...otherProps }: ViewProps) => {
  return (
    <UText
      style={[
        {
          fontWeight: 600,
        },
        style,
      ]}
      {...otherProps}
    />
  );
};
