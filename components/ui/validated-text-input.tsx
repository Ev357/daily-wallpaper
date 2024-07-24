import { View, type TextInputProps } from "react-native";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";
import { UTextInput } from "@/components/ui/text-input";
import { useState } from "react";
import { UText } from "@/components/ui/text";

export const UValidatedTextInput = ({
  isValid,
  style,
  onChangeText,
  onBlur,
  ...otherProps
}: TextInputProps & {
  isValid: (value: string) => {
    isValid: boolean;
    errorMessage?: string;
  };
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState<{
    isValid: boolean;
    errorMessage?: string;
  }>({
    isValid: true,
  });
  const colors = useColors();

  const showError = isTouched && !error.isValid;

  return (
    <View style={{ gap: spacing["0.5"] }}>
      <UTextInput
        onChangeText={(text) => {
          setError(isValid(text));

          if (onChangeText) {
            onChangeText(text);
          }
        }}
        onBlur={(e) => {
          if (!isTouched) {
            setIsTouched(true);
          }

          setError(isValid(e.nativeEvent.text));

          if (onBlur) {
            onBlur(e);
          }
        }}
        style={[
          {
            borderColor: showError ? colors.destructive : colors.border,
          },
          style,
        ]}
        {...otherProps}
      />
      {showError && (
        <UText size="sm" style={{ color: colors.destructive }}>
          {error.errorMessage ?? "Invalid"}
        </UText>
      )}
    </View>
  );
};
