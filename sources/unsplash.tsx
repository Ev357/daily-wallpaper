import EventTiming from "@/components/EventTiming";
import { Source } from "@/sources/types";
import { useState } from "react";

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
  );
};
