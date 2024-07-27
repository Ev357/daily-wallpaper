import { ScreenType, screenTypes } from "@/constants/screenTypes";
import { setWallpaper as setWallpaperNative } from "rn-wallpapers";

export const setWallpaper = async (uri: string, screenType: ScreenType) => {
  await setWallpaperNative(
    {
      uri,
    },
    screenTypes[screenType]
  );
};
