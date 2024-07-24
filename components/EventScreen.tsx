import { View } from "react-native";
import { UText } from "@/components/ui/text";
import { spacing } from "@expo/styleguide-base";
import { UPicker, UPickerItem } from "@/components/ui/picker";
import type { ScreenType } from "@/constants/screenTypes";

const EventScreen = ({
  screenType,
  setScreenType,
}: {
  screenType: ScreenType;
  setScreenType: (value: ScreenType) => void;
}) => {
  const screenTypes: { value: ScreenType; label: string }[] = [
    { value: "home", label: "Home Screen" },
    { value: "lock", label: "Lock Screen" },
    { value: "both", label: "Both Screens" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[2],
      }}
    >
      <UText size="lg">Event Screen:</UText>
      <UPicker
        selectedValue={screenType}
        onValueChange={(itemValue) => setScreenType(itemValue)}
        mode="dropdown"
        containerStyle={{
          flexGrow: 1,
        }}
      >
        {screenTypes.map(({ value, label }) => (
          <UPickerItem key={value} label={label} value={value} />
        ))}
      </UPicker>
    </View>
  );
};

export default EventScreen;
