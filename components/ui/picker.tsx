import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";
import {
  Picker,
  type PickerProps,
  type PickerItemProps,
} from "@react-native-picker/picker";
import type { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { type StyleProp, View, type ViewStyle } from "react-native";

export const UPicker = <T = ItemValue,>({
  style,
  dropdownIconColor,
  containerStyle,
  ...otherProps
}: PickerProps<T> & {
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const colors = useColors();

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: spacing[2],
        },
        containerStyle,
      ]}
    >
      <Picker
        style={[
          {
            color: colors.foreground,
          },
          style,
        ]}
        dropdownIconColor={dropdownIconColor ?? colors.foreground}
        {...otherProps}
      />
    </View>
  );
};

export const UPickerItem = <T = ItemValue,>({
  color,
  style,
  ...otherProps
}: PickerItemProps<T>) => {
  const colors = useColors();

  return (
    <Picker.Item
      color={color ?? colors.destructive}
      style={{
        backgroundColor: colors.destructive,
        color: colors.destructive,
      }}
      {...otherProps}
    />
  );
};
