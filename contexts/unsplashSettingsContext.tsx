import {
  createContext,
  useReducer,
  type ReactNode,
  type Dispatch,
  useContext,
} from "react";

export type UnsplashOrientation = "portrait" | "landscape" | "squarish";

export type UnsplashColor =
  | "all"
  | "black_and_white"
  | "black"
  | "white"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "magenta"
  | "green"
  | "teal"
  | "blue";

export type SourceType =
  | "topic"
  | "search"
  | "collections"
  | "user"
  | "random"
  | "photo";

export type Settings = {
  sourceType: SourceType;
  settings: {
    topic: {
      topic: string;
      orderBy: "popular" | "latest" | "oldest";
      orientation: UnsplashOrientation;
      isValid: boolean;
    };
    search: {
      query: string;
      orderBy: "latest" | "relevant";
      collections: string | undefined;
      color: UnsplashColor;
      orientation: "portrait" | "landscape" | "all";
      isValid: boolean;
    };
    collections: {
      collectionId: string;
      orientation: UnsplashOrientation;
      isValid: boolean;
    };
    user: {
      username: string;
      orderBy: "popular" | "latest" | "views" | "downloads" | "oldest";
      orientation: UnsplashOrientation;
      isValid: boolean;
    };
    random: {
      collections: string | undefined;
      topics: string | undefined;
      username: string | undefined;
      query: string | undefined;
      orientation: UnsplashOrientation;
    };
    photo: {
      photoId: string;
      isValid: boolean;
    };
  };
  isValid: boolean;
  touchAll: boolean;
};

export type RawUnsplashSettings = {
  sourceType: SourceType;
  settings: {
    topic: {
      topic: string;
      orderBy: "popular" | "latest" | "oldest";
      orientation: UnsplashOrientation;
    };
    search: {
      query: string;
      orderBy: "latest" | "relevant";
      collections: string | undefined;
      color: UnsplashColor;
      orientation: "portrait" | "landscape" | "all";
    };
    collections: {
      collectionId: string;
      orientation: UnsplashOrientation;
    };
    user: {
      username: string;
      orderBy: "popular" | "latest" | "views" | "downloads" | "oldest";
      orientation: UnsplashOrientation;
    };
    random: {
      collections: string | undefined;
      topics: string | undefined;
      username: string | undefined;
      query: string | undefined;
      orientation: UnsplashOrientation;
    };
    photo: {
      photoId: string;
    };
  };
};

export type UnsplashSettingsActions =
  | {
      type: "setSourceType";
      sourceType: SourceType;
    }
  | {
      type: "setTopicTopic";
      topic: string;
    }
  | {
      type: "setTopicOrderBy";
      orderBy: "popular" | "latest" | "oldest";
    }
  | {
      type: "setTopicOrientation";
      orientation: UnsplashOrientation;
    }
  | {
      type: "setTopicIsValid";
      isValid: boolean;
    }
  | {
      type: "setSearchQuery";
      query: string;
    }
  | {
      type: "setSearchOrderBy";
      orderBy: "latest" | "relevant";
    }
  | {
      type: "setSearchCollections";
      collections: string | undefined;
    }
  | {
      type: "setSearchColor";
      color: UnsplashColor;
    }
  | {
      type: "setSearchOrientation";
      orientation: "portrait" | "landscape" | "all";
    }
  | {
      type: "setSearchIsValid";
      isValid: boolean;
    }
  | {
      type: "setCollectionCollectionId";
      collectionId: string;
    }
  | {
      type: "setCollectionOrientation";
      orientation: UnsplashOrientation;
    }
  | {
      type: "setCollectionIsValid";
      isValid: boolean;
    }
  | {
      type: "setUserUsername";
      username: string;
    }
  | {
      type: "setUserOrderBy";
      orderBy: "popular" | "latest" | "views" | "downloads" | "oldest";
    }
  | {
      type: "setUserOrientation";
      orientation: UnsplashOrientation;
    }
  | {
      type: "setUserIsValid";
      isValid: boolean;
    }
  | {
      type: "setRandomCollections";
      collections: string | undefined;
    }
  | {
      type: "setRandomTopics";
      topics: string | undefined;
    }
  | {
      type: "setRandomUsername";
      username: string | undefined;
    }
  | {
      type: "setRandomQuery";
      query: string | undefined;
    }
  | {
      type: "setRandomOrientation";
      orientation: UnsplashOrientation;
    }
  | {
      type: "setPhotoPhotoId";
      photoId: string;
    }
  | {
      type: "setPhotoIsValid";
      isValid: boolean;
    }
  | {
      type: "setTouchAll";
      touchAll: boolean;
    };

const unsplashSettingsReducer = (
  state: Settings,
  action: UnsplashSettingsActions
) => {
  const checkIsSourceValid = () => {
    const source = state.settings[state.sourceType];

    if ("isValid" in source) {
      state.isValid = source.isValid;
      return;
    }

    state.isValid = true;
  };

  switch (action.type) {
    case "setSourceType":
      state = {
        ...state,
        sourceType: action.sourceType,
      };

      checkIsSourceValid();

      return state;
    case "setTopicTopic":
      return {
        ...state,
        settings: {
          ...state.settings,
          topic: {
            ...state.settings.topic,
            topic: action.topic,
          },
        },
      } satisfies Settings;
    case "setTopicIsValid":
      state = {
        ...state,
        settings: {
          ...state.settings,
          topic: {
            ...state.settings.topic,
            isValid: action.isValid,
          },
        },
      };

      checkIsSourceValid();

      return state;
    case "setTopicOrderBy":
      return {
        ...state,
        settings: {
          ...state.settings,
          topic: {
            ...state.settings.topic,
            orderBy: action.orderBy,
          },
        },
      } satisfies Settings;
    case "setTopicOrientation":
      return {
        ...state,
        settings: {
          ...state.settings,
          topic: {
            ...state.settings.topic,
            orientation: action.orientation,
          },
        },
      } satisfies Settings;
    case "setSearchQuery":
      return {
        ...state,
        settings: {
          ...state.settings,
          search: {
            ...state.settings.search,
            query: action.query,
          },
        },
      } satisfies Settings;
    case "setSearchOrderBy":
      return {
        ...state,
        settings: {
          ...state.settings,
          search: {
            ...state.settings.search,
            orderBy: action.orderBy,
          },
        },
      } satisfies Settings;
    case "setSearchCollections":
      return {
        ...state,
        settings: {
          ...state.settings,
          search: {
            ...state.settings.search,
            collections: action.collections,
          },
        },
      } satisfies Settings;
    case "setSearchColor":
      return {
        ...state,
        settings: {
          ...state.settings,
          search: {
            ...state.settings.search,
            color: action.color,
          },
        },
      } satisfies Settings;
    case "setSearchOrientation":
      return {
        ...state,
        settings: {
          ...state.settings,
          search: {
            ...state.settings.search,
            orientation: action.orientation,
          },
        },
      } satisfies Settings;
    case "setSearchIsValid":
      state = {
        ...state,
        settings: {
          ...state.settings,
          search: {
            ...state.settings.search,
            isValid: action.isValid,
          },
        },
      };

      checkIsSourceValid();

      return state;
    case "setCollectionCollectionId":
      return {
        ...state,
        settings: {
          ...state.settings,
          collections: {
            ...state.settings.collections,
            collectionId: action.collectionId,
          },
        },
      } satisfies Settings;
    case "setCollectionOrientation":
      return {
        ...state,
        settings: {
          ...state.settings,
          collections: {
            ...state.settings.collections,
            orientation: action.orientation,
          },
        },
      } satisfies Settings;
    case "setCollectionIsValid":
      state = {
        ...state,
        settings: {
          ...state.settings,
          collections: {
            ...state.settings.collections,
            isValid: action.isValid,
          },
        },
      };

      checkIsSourceValid();

      return state;
    case "setUserUsername":
      return {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            username: action.username,
          },
        },
      } satisfies Settings;
    case "setUserOrderBy":
      return {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            orderBy: action.orderBy,
          },
        },
      } satisfies Settings;
    case "setUserOrientation":
      return {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            orientation: action.orientation,
          },
        },
      } satisfies Settings;
    case "setUserIsValid":
      state = {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            isValid: action.isValid,
          },
        },
      };

      checkIsSourceValid();

      return state;
    case "setRandomCollections":
      return {
        ...state,
        settings: {
          ...state.settings,
          random: {
            ...state.settings.random,
            collections: action.collections,
          },
        },
      } satisfies Settings;
    case "setRandomTopics":
      return {
        ...state,
        settings: {
          ...state.settings,
          random: {
            ...state.settings.random,
            topics: action.topics,
          },
        },
      } satisfies Settings;
    case "setRandomUsername":
      return {
        ...state,
        settings: {
          ...state.settings,
          random: {
            ...state.settings.random,
            username: action.username,
          },
        },
      } satisfies Settings;
    case "setRandomQuery":
      return {
        ...state,
        settings: {
          ...state.settings,
          random: {
            ...state.settings.random,
            query: action.query,
          },
        },
      } satisfies Settings;
    case "setRandomOrientation":
      return {
        ...state,
        settings: {
          ...state.settings,
          random: {
            ...state.settings.random,
            orientation: action.orientation,
          },
        },
      } satisfies Settings;
    case "setPhotoPhotoId":
      return {
        ...state,
        settings: {
          ...state.settings,
          photo: {
            ...state.settings.photo,
            photoId: action.photoId,
          },
        },
      } satisfies Settings;
    case "setPhotoIsValid":
      state = {
        ...state,
        settings: {
          ...state.settings,
          photo: {
            ...state.settings.photo,
            isValid: action.isValid,
          },
        },
      };

      checkIsSourceValid();

      return state;
    case "setTouchAll":
      return {
        ...state,
        touchAll: action.touchAll,
      };
  }
};

export const UnsplashSettingsContext = createContext<
  | {
      settings: Settings;
      dispatchSettings: Dispatch<UnsplashSettingsActions>;
    }
  | undefined
>(undefined);

export const UnsplashSettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settings, dispatchSettings] = useReducer(unsplashSettingsReducer, {
    sourceType: "topic",
    settings: {
      topic: {
        topic: "wallpapers",
        orderBy: "popular",
        orientation: "portrait",
        isValid: true,
      },
      search: {
        query: "",
        orderBy: "latest",
        collections: undefined,
        color: "all",
        orientation: "portrait",
        isValid: false,
      },
      collections: {
        collectionId: "",
        orientation: "portrait",
        isValid: false,
      },
      user: {
        username: "",
        orderBy: "popular",
        orientation: "portrait",
        isValid: false,
      },
      random: {
        collections: undefined,
        topics: undefined,
        username: undefined,
        query: undefined,
        orientation: "portrait",
      },
      photo: {
        photoId: "",
        isValid: false,
      },
    },
    isValid: true,
    touchAll: false,
  } satisfies Settings);

  return (
    <UnsplashSettingsContext.Provider value={{ settings, dispatchSettings }}>
      {children}
    </UnsplashSettingsContext.Provider>
  );
};

export const useUnsplashSettings = () => {
  const context = useContext(UnsplashSettingsContext);

  if (!context) {
    throw new Error(
      "useUnsplashSettings must be used within a UnsplashSettingsContextProvider"
    );
  }

  return context;
};
