import { TYPE_SCREEN } from "rn-wallpapers";

export type ScreenType = "home" | "lock" | "both";

export const screenTypes = {
  home: TYPE_SCREEN.HOME,
  lock: TYPE_SCREEN.LOCK,
  both: TYPE_SCREEN.BOTH,
} as const satisfies Record<ScreenType, TYPE_SCREEN>;
