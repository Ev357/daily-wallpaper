import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";

const UButton = ({ style, ...otherProps }: TouchableOpacityProps) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: spacing[2],
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export { UButton };
