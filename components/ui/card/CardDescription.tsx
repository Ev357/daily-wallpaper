import { type ViewProps } from "react-native";
import { UText } from "@/components/ui/Text";
import { useColors } from "@/hooks/useColors";

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
