import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import BackgroundFetch from "react-native-background-fetch";
import { onEvent } from "./utils/initBackgroundFetch";

BackgroundFetch.registerHeadlessTask(async (event) => {
  if (event.timeout) {
    BackgroundFetch.finish(event.taskId);
    return;
  }

  await onEvent(event.taskId);
});

export const App = () => {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
};

registerRootComponent(App);
