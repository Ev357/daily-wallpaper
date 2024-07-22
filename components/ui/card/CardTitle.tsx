import { type ViewProps } from "react-native";
import { UText } from "@/components/ui/Text";

export const UCardTitle = ({ style, ...otherProps }: ViewProps) => {
  return (
    <UText
      style={[
        {
          fontWeight: 600,
        },
        style,
      ]}
      {...otherProps}
    />
  );
};
