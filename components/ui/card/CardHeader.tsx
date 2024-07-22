import { View, type ViewProps } from "react-native";
import { spacing } from "@expo/styleguide-base";

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
