import { Stack } from "expo-router";

const SourceLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Events",
        }}
      />
    </Stack>
  );
};

export default SourceLayout;
