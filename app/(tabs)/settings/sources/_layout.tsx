import { Stack } from "expo-router";

const SourceLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sources Settings",
        }}
      />
      <Stack.Screen name="[name]" options={{ title: "Source Settings" }} />
    </Stack>
  );
};

export default SourceLayout;
