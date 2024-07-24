import { View } from "react-native";
import { UText } from "@/components/ui/text";
import { spacing } from "@expo/styleguide-base";
import { UPicker, UPickerItem } from "@/components/ui/picker";
import { useSourceContext } from "@/contexts/sourceContext";

const SourceScreen = () => {
  const { source, dispatchSource } = useSourceContext();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[2],
      }}
    >
      <UText size="lg">Event Screen</UText>
      <UPicker
        selectedValue={source.screenType}
        onValueChange={(itemValue) => {
          dispatchSource({ type: "setScreenType", screenType: itemValue });
        }}
        mode="dropdown"
        containerStyle={{
          flexGrow: 1,
        }}
      >
        <UPickerItem label="Home Screen" value="home" />
        <UPickerItem label="Lock Screen" value="lock" />
        <UPickerItem label="Both Screens" value="both" />
      </UPicker>
    </View>
  );
};

export default SourceScreen;
