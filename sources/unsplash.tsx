import EventScreen from "@/components/EventScreen";
import EventTiming from "@/components/EventTiming";
import { USeparator } from "@/components/ui/separator";
import { Source } from "@/sources/types";
import { spacing } from "@expo/styleguide-base";
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

  return (
    <View style={{ gap: spacing[2] }}>
      <EventTiming
        triggerType={triggerType}
        setTriggerType={setTriggerType}
        interval={interval}
        setInterval={setInterval}
        intervalUnit={intervalUnit}
        setIntervalUnit={setIntervalUnit}
        specificTime={specificTime}
        setSpecificTime={setSpecificTime}
      />
      <USeparator />
      <EventScreen />
    </View>
  );
};
