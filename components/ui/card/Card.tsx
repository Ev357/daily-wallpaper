import { View, type ViewProps } from "react-native";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";

export const UCard = ({ style, ...otherProps }: ViewProps) => {
  const colors = useColors();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
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
