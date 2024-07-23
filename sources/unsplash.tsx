import { UButton } from "@/components/ui/button";
import { UPicker, UPickerItem } from "@/components/ui/picker";
import { UTextInput } from "@/components/ui/text-input";
import { UText } from "@/components/ui/text/Text";
import { Source } from "@/sources/types";
import { getFormattedTime } from "@/utils/getFormattedTime";
import { spacing } from "@expo/styleguide-base";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View } from "react-native";

export const unsplashSource: Source = {
  name: "unsplash",
  title: "Unsplash",
};

export const Unsplash = () => {
  const [triggerType, setTriggerType] = useState<"periodic" | "specificTime">(
    "specificTime"
  );
  const [interval, setInterval] = useState(15);
  const [intervalUnit, setIntervalUnit] = useState<
    "seconds" | "minutes" | "hours" | "days"
  >("minutes");
  const [specificTime, setSpecificTime] = useState(new Date());

  const getDateTime = () => {
    DateTimePickerAndroid.open({
      mode: "time",
      value: specificTime,
      is24Hour: true,
      onChange: (_, selectedTime) => {
        setSpecificTime(selectedTime ?? specificTime);
      },
    });
  };

  return (
    <View style={{ gap: spacing[2] }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText size="lg">Trigger Type:</UText>

        <UPicker
          selectedValue={triggerType}
          onValueChange={(itemValue) => setTriggerType(itemValue)}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="Specific Time" value="specificTime" />
          <UPickerItem label="Periodic" value="periodic" />
        </UPicker>
      </View>

      {triggerType === "periodic" ? (
        <View style={{ flexDirection: "row", gap: spacing[2] }}>
          <UTextInput
            keyboardType="numeric"
            value={String(interval)}
            onChangeText={(text) => setInterval(Number(text))}
            maxLength={10}
            style={{ flexGrow: 1 }}
          />

          <UPicker
            selectedValue={intervalUnit}
            onValueChange={(itemValue) => setIntervalUnit(itemValue)}
            mode="dropdown"
            containerStyle={{
              width: spacing[24],
            }}
          >
            <UPickerItem label="s" value="seconds" />
            <UPickerItem label="m" value="minutes" />
            <UPickerItem label="h" value="hours" />
            <UPickerItem label="d" value="days" />
          </UPicker>
        </View>
      ) : (
        <UButton onPress={getDateTime}>
          <UText>{getFormattedTime(specificTime)}</UText>
        </UButton>
      )}
    </View>
  );
};
