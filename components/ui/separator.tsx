import { useColors } from "@/hooks/useColors";
import { View, type ViewProps } from "react-native";

export const USeparator = ({ style, ...otherProps }: ViewProps) => {
  const colors = useColors();

  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: colors.border,
        },
        style,
      ]}
      {...otherProps}
    />
  );
};
