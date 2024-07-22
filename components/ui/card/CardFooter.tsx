import { View, type ViewProps } from "react-native";
import { spacing } from "@expo/styleguide-base";

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
