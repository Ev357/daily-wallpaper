import { db } from "@/db";
import BackgroundFetch from "react-native-background-fetch";
import { getUnsplashBackground } from "@/utils/getUnsplashBackground";
import { setWallpaper } from "@/utils/setWallpaper";

export const onEvent = async (taskId: string) => {
  const events = await db.query.events.findMany();
  for (const event of events) {
    switch (event.source) {
      case "unsplash":
        const image = await getUnsplashBackground(event.sourceSettings);

        if (!image) return;

        setWallpaper(image, "home");
        break;
    }
  }

  BackgroundFetch.finish(taskId);
};

export const initBackgroundFetch = async () => {
  const onTimeout = async (taskId: string) => {
    BackgroundFetch.finish(taskId);
  };

  await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
    },
    onEvent,
    onTimeout
  );

  await BackgroundFetch.scheduleTask({
    taskId: "com.ev357.dailywallpaper.update",
    forceAlarmManager: true,
    periodic: true,
    delay: 5000,
    enableHeadless: true,
    stopOnTerminate: false,
    startOnBoot: true,
  });
};
