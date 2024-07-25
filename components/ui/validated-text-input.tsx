import {
  type StyleProp,
  View,
  type ViewStyle,
  type TextInputProps,
} from "react-native";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";
import { UTextInput } from "@/components/ui/text-input";
import { useEffect, useState } from "react";
import { UText } from "@/components/ui/text";

export const UValidatedTextInput = ({
  isValid,
  style,
  onChangeText,
  onBlur,
  setIsValid,
  value,
  containerStyle,
  touched,
  ...otherProps
}: TextInputProps & {
  isValid: (value: string | undefined) => {
    isValid: boolean;
    errorMessage?: string;
  };
  setIsValid?: (value: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  touched?: boolean;
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState<{
    isValid: boolean;
    errorMessage?: string;
  }>({
    isValid: true,
  });
  const colors = useColors();

  const showError = (touched || isTouched) && !error.isValid;

  useEffect(() => {
    if (!setIsValid) return;

    setIsValid(isValid(value).isValid);
  }, [value]);

  useEffect(() => {
    if (!touched) return;

    setError(isValid(value));
  }, [touched]);

  return (
    <View style={[{ gap: spacing["0.5"] }, containerStyle]}>
      <UTextInput
        value={value}
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

          setError(isValid(value));

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
