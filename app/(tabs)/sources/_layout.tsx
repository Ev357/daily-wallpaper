import { Stack } from "expo-router";

const SourceLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sources",
        }}
      />
      <Stack.Screen name="new-event" options={{ title: "New Event" }} />
    </Stack>
  );
};

export default SourceLayout;
