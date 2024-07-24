import type { ScreenType } from "@/constants/screenTypes";
import {
  createContext,
  type ReactNode,
  type Dispatch,
  useReducer,
  useContext,
} from "react";

export type SourceSettings = {
  triggerType: "periodic" | "specificTime";
  periodic: {
    interval: number;
    intervalUnit: "seconds" | "minutes" | "hours" | "days";
  };
  specificTime: Date;
  screenType: ScreenType;
};

export type SourceSettingsActions =
  | {
      type: "setTriggerType";
      triggerType: "periodic" | "specificTime";
    }
  | {
      type: "setInterval";
      interval: number;
    }
  | {
      type: "setIntervalUnit";
      intervalUnit: "seconds" | "minutes" | "hours" | "days";
    }
  | {
      type: "setSpecificTime";
      specificTime: Date;
    }
  | {
      type: "setScreenType";
      screenType: ScreenType;
    };

const sourceReducer = (
  state: SourceSettings,
  action: SourceSettingsActions
) => {
  switch (action.type) {
    case "setTriggerType":
      return {
        ...state,
        triggerType: action.triggerType,
      } satisfies SourceSettings;
    case "setInterval":
      return {
        ...state,
        periodic: {
          ...state.periodic,
          interval: action.interval,
        },
      } satisfies SourceSettings;
    case "setIntervalUnit":
      return {
        ...state,
        periodic: {
          ...state.periodic,
          intervalUnit: action.intervalUnit,
        },
      } satisfies SourceSettings;
    case "setSpecificTime":
      return {
        ...state,
        specificTime: action.specificTime,
      } satisfies SourceSettings;
    case "setScreenType":
      return {
        ...state,
        screenType: action.screenType,
      } satisfies SourceSettings;
  }
};

export const SourceSettingsContext = createContext<
  | {
      source: SourceSettings;
      dispatchSource: Dispatch<SourceSettingsActions>;
    }
  | undefined
>(undefined);

export const SourceContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [source, dispatchSource] = useReducer(sourceReducer, {
    triggerType: "specificTime",
    periodic: {
      interval: 15,
      intervalUnit: "minutes",
    },
    specificTime: new Date(),
    screenType: "home",
  } satisfies SourceSettings);

  return (
    <SourceSettingsContext.Provider value={{ source, dispatchSource }}>
      {children}
    </SourceSettingsContext.Provider>
  );
};

export const useSourceContext = () => {
  const context = useContext(SourceSettingsContext);

  if (!context) {
    throw new Error(
      "useSourceContext must be used within a SourceContextProvider"
    );
  }

  return context;
};
