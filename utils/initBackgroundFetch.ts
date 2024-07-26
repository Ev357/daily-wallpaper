import BackgroundFetch from "react-native-background-fetch";

export const initBackgroundFetch = async () => {
  const onEvent = async (taskId: string) => {
    console.log("[BackgroundFetch] taskId: ", taskId);

    switch (taskId) {
      case "com.ev357.dailywallpaper.update":
        console.log("Received custom task");
        break;
      default:
        console.log("Default fetch task");
    }

    BackgroundFetch.finish(taskId);
  };

  const onTimeout = async (taskId: string) => {
    BackgroundFetch.finish(taskId);
  };

  console.log("Initializing background fetch");

  try {
    await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
      },
      onEvent,
      onTimeout
    );
  } catch (error) {
    console.log("Error configuring background fetch: ", error);
  }

  console.log("Is BackgroundFetch available: ");

  await BackgroundFetch.scheduleTask({
    taskId: "com.ev357.dailywallpaper.update",
    forceAlarmManager: true,
    periodic: true,
    delay: 5000,
  });
};
