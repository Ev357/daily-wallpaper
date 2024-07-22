import { View, type ViewProps } from "react-native";
import { spacing } from "@expo/styleguide-base";

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
