import { TextInput, type TextInputProps } from "react-native";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";

const UTextInput = ({
  style,
  placeholderTextColor,
  ...otherProps
}: TextInputProps) => {
  const colors = useColors();

  return (
    <TextInput
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          color: colors.foreground,
          borderRadius: spacing[2],
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
          fontSize: 16,
        },
        style,
      ]}
      placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
      {...otherProps}
    />
  );
};

export { UTextInput };
