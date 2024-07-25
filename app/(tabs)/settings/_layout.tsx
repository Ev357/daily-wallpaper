import { Stack } from "expo-router";

const SourceLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="sources"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SourceLayout;
