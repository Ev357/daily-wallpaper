import { UButton } from "@/components/ui/button";
import { UPicker, UPickerItem } from "@/components/ui/picker";
import { UTextInput } from "@/components/ui/text-input";
import { UText } from "@/components/ui/text";
import { getFormattedTime } from "@/utils/getFormattedTime";
import { spacing } from "@expo/styleguide-base";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { View } from "react-native";
import { useSourceContext } from "@/contexts/sourceContext";

const SourceTiming = () => {
  const { source, dispatchSource } = useSourceContext();

  const getDateTime = () => {
    DateTimePickerAndroid.open({
      mode: "time",
      value: source.specificTime,
      is24Hour: true,
      onChange: (_, selectedTime) => {
        if (!selectedTime) return;

        dispatchSource({
          type: "setSpecificTime",
          specificTime: selectedTime,
        });
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
        <UText size="lg">Trigger Type</UText>
        <UPicker
          selectedValue={source.triggerType}
          onValueChange={(itemValue) => {
            dispatchSource({ type: "setTriggerType", triggerType: itemValue });
          }}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="Specific Time" value="specificTime" />
          <UPickerItem label="Periodic" value="periodic" />
        </UPicker>
      </View>

      {source.triggerType === "periodic" ? (
        <View style={{ flexDirection: "row", gap: spacing[2] }}>
          <UTextInput
            keyboardType="numeric"
            value={String(source.periodic.interval)}
            onChangeText={(text) => {
              dispatchSource({
                type: "setInterval",
                interval: Number(text),
              });
            }}
            maxLength={10}
            style={{ flexGrow: 1 }}
          />

          <UPicker
            selectedValue={source.periodic.intervalUnit}
            onValueChange={(itemValue) => {
              dispatchSource({
                type: "setIntervalUnit",
                intervalUnit: itemValue,
              });
            }}
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
        <UButton onPress={getDateTime} variant="outline">
          <UText>{getFormattedTime(source.specificTime)}</UText>
        </UButton>
      )}
    </View>
  );
};

export default SourceTiming;
