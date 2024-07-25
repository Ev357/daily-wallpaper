import SourceScreen from "@/components/SourceScreen";
import SourceTiming from "@/components/SourceTiming";
import { UAlert, UAlertDescription, UAlertTitle } from "@/components/ui/alert";
import { UButton } from "@/components/ui/button";
import { UPicker, UPickerItem } from "@/components/ui/picker";
import { USeparator } from "@/components/ui/separator";
import { UText } from "@/components/ui/text";
import { UTextInput } from "@/components/ui/text-input";
import { UValidatedTextInput } from "@/components/ui/validated-text-input";
import {
  SourceContextProvider,
  useSourceContext,
} from "@/contexts/sourceContext";
import {
  type UnsplashOrientation as UnsplashOrientationType,
  UnsplashSettingsContextProvider,
  useUnsplashSettings,
} from "@/contexts/unsplashSettingsContext";
import { useColors } from "@/hooks/useColors";
import { useIsKeyConfigured } from "@/hooks/useIsKeyConfigured";
import { Source } from "@/sources/types";
import { spacing } from "@expo/styleguide-base";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";

export const unsplashSource: Source = {
  name: "unsplash",
  title: "Unsplash",
};

export const Unsplash = () => {
  return (
    <SourceContextProvider>
      <UnsplashSettingsContextProvider>
        <UnsplashScreen />
      </UnsplashSettingsContextProvider>
    </SourceContextProvider>
  );
};

export const UnsplashScreen = () => {
  const colors = useColors();

  const { settings, dispatchSettings } = useUnsplashSettings();
  const { source, dispatchSource } = useSourceContext();

  const touchAll = () => {
    dispatchSettings({ type: "setTouchAll", touchAll: true });
    dispatchSource({ type: "setTouchAll", touchAll: true });
  };

  const [isAccessKeyConfigured] = useIsKeyConfigured("unsplashAccessKey");

  const router = useRouter();

  return (
    <ScrollView>
      <View style={{ gap: spacing[2], paddingBottom: spacing[4] }}>
        {!isAccessKeyConfigured && (
          <>
            <TouchableOpacity
              onPress={() => {
                // https://github.com/expo/expo/issues/26211
                router.push("/settings");
                setTimeout(() => {
                  router.push({
                    pathname: "/settings/sources/",
                  });
                  setTimeout(() => {
                    router.push({
                      pathname: "/settings/sources/[name]",
                      params: { name: "unsplash" },
                    });
                  });
                });
              }}
            >
              <UAlert icon="warning-outline" variant="destructive">
                <UAlertTitle>Warning</UAlertTitle>
                <UAlertDescription>
                  The Unsplash Access Key needs to be configured. Click here to
                  set it up.
                </UAlertDescription>
              </UAlert>
            </TouchableOpacity>
            <USeparator />
          </>
        )}
        <SourceTiming />
        <USeparator />
        <SourceScreen />
        <USeparator />
        <UnsplashSettings />
        <UButton
          onPress={() => {
            if (!settings.isValid || !source.isValid) {
              touchAll();
              return;
            }

            // TODO: Save
          }}
        >
          <UText
            style={{ color: colors.primaryForeground, textAlign: "center" }}
          >
            Save
          </UText>
        </UButton>
      </View>
    </ScrollView>
  );
};

export const UnsplashSettings = () => {
  const { settings, dispatchSettings } = useUnsplashSettings();

  return (
    <View style={{ gap: spacing[2] }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText size="lg">Source:</UText>
        <UPicker
          selectedValue={settings.sourceType}
          onValueChange={(itemValue) => {
            dispatchSettings({ type: "setSourceType", sourceType: itemValue });
          }}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="Topics" value="topic" />
          <UPickerItem label="Search" value="search" />
          <UPickerItem label="Collections" value="collections" />
          <UPickerItem label="User Photos" value="user" />
          <UPickerItem label="Random Photo" value="random" />
          <UPickerItem label="Photo" value="photo" />
        </UPicker>
      </View>
      {
        {
          topic: <UnsplashTopic />,
          search: <UnsplashSearch />,
          collections: <UnsplashCollection />,
          user: <UnsplashUser />,
          random: <UnsplashRandom />,
          photo: <UnsplashPhoto />,
        }[settings.sourceType]
      }
    </View>
  );
};

export const UnsplashTopic = () => {
  const { settings, dispatchSettings } = useUnsplashSettings();

  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Topic*</UText>
      <UValidatedTextInput
        placeholder="Id or slug"
        value={settings.settings.topic.topic}
        isValid={(text) => ({
          isValid: !!text,
          errorMessage: "Required",
        })}
        setIsValid={(isValid) => {
          dispatchSettings({ type: "setTopicIsValid", isValid });
        }}
        onChangeText={(text) => {
          dispatchSettings({ type: "setTopicTopic", topic: text.trim() });
        }}
        touched={settings.touchAll}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText>Order By:</UText>
        <UPicker
          selectedValue={settings.settings.topic.orderBy}
          onValueChange={(itemValue) => {
            dispatchSettings({ type: "setTopicOrderBy", orderBy: itemValue });
          }}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="Popular" value="popular" />
          <UPickerItem label="Latest" value="latest" />
          <UPickerItem label="Oldest" value="oldest" />
        </UPicker>
      </View>
      <UnsplashOrientation
        orientation={settings.settings.topic.orientation}
        setOrientation={(orientation) => {
          dispatchSettings({ type: "setTopicOrientation", orientation });
        }}
      />
    </View>
  );
};

export const UnsplashSearch = () => {
  const { settings, dispatchSettings } = useUnsplashSettings();

  return (
    <View style={{ gap: spacing[2] }}>
      <UnsplashQuery
        query={settings.settings.search.query}
        setQuery={(query) => {
          dispatchSettings({ type: "setSearchQuery", query });
        }}
        setIsValid={(isValid) => {
          dispatchSettings({ type: "setSearchIsValid", isValid });
        }}
        touched={settings.touchAll}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText>Order by:</UText>
        <UPicker
          selectedValue={settings.settings.search.orderBy}
          onValueChange={(itemValue) => {
            dispatchSettings({ type: "setSearchOrderBy", orderBy: itemValue });
          }}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="Latest" value="latest" />
          <UPickerItem label="Relevant" value="relevant" />
        </UPicker>
      </View>
      <UnsplashCollections
        collections={settings.settings.search.collections}
        setCollections={(collections) => {
          dispatchSettings({ type: "setSearchCollections", collections });
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText>Color:</UText>
        <UPicker
          selectedValue={settings.settings.search.color}
          onValueChange={(itemValue) => {
            dispatchSettings({ type: "setSearchColor", color: itemValue });
          }}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="All" value="all" />
          <UPickerItem label="Black and White" value="black_and_white" />
          <UPickerItem label="Black" value="black" />
          <UPickerItem label="White" value="white" />
          <UPickerItem label="Yellow" value="yellow" />
          <UPickerItem label="Orange" value="orange" />
          <UPickerItem label="Red" value="red" />
          <UPickerItem label="Purple" value="purple" />
          <UPickerItem label="Magenta" value="magenta" />
          <UPickerItem label="Green" value="green" />
          <UPickerItem label="Teal" value="teal" />
          <UPickerItem label="Blue" value="blue" />
        </UPicker>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText>Orientation:</UText>
        <UPicker
          selectedValue={settings.settings.search.orientation}
          onValueChange={(itemValue) => {
            dispatchSettings({
              type: "setSearchOrientation",
              orientation: itemValue,
            });
          }}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="Portrait" value="portrait" />
          <UPickerItem label="Landscape" value="landscape" />
          <UPickerItem label="All" value="all" />
        </UPicker>
      </View>
    </View>
  );
};

export const UnsplashOrientation = ({
  orientation,
  setOrientation,
}: {
  orientation: UnsplashOrientationType;
  setOrientation: (value: UnsplashOrientationType) => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[2],
      }}
    >
      <UText>Orientation:</UText>
      <UPicker
        selectedValue={orientation}
        onValueChange={(itemValue) => {
          setOrientation(itemValue);
        }}
        mode="dropdown"
        containerStyle={{
          flexGrow: 1,
        }}
      >
        <UPickerItem label="Portrait" value="portrait" />
        <UPickerItem label="Landscape" value="landscape" />
        <UPickerItem label="Squarish" value="squarish" />
      </UPicker>
    </View>
  );
};

export const UnsplashQuery = ({
  query,
  setQuery,
  optional = false,
  setIsValid,
  touched,
}:
  | {
      query: string;
      setQuery: (value: string) => void;
      optional?: false;
      setIsValid?: (value: boolean) => void;
      touched?: boolean;
    }
  | {
      query: string | undefined;
      setQuery: (value: string | undefined) => void;
      optional: true;
      setIsValid?: (value: boolean) => void;
      touched?: boolean;
    }) => {
  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Query{!optional && "*"}</UText>
      <UValidatedTextInput
        placeholder="Query"
        value={query}
        isValid={(text) => ({
          isValid: optional || !!text,
          errorMessage: "Required",
        })}
        setIsValid={setIsValid}
        onChangeText={(text) => {
          (
            setQuery as typeof optional extends false
              ? (value: string) => void
              : (value: string | undefined) => void
          )(!optional ? text.trim() : text.trim() || undefined);
        }}
        touched={touched}
      />
    </View>
  );
};

export const UnsplashCollections = ({
  collections,
  setCollections,
}: {
  collections: string | undefined;
  setCollections: (value: string | undefined) => void;
}) => {
  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Collections</UText>
      <UTextInput
        placeholder="Collection ID(s), comma-separated"
        value={collections}
        onChangeText={(text) => {
          setCollections(text.trim() || undefined);
        }}
      />
    </View>
  );
};

export const UnsplashCollection = () => {
  const { settings, dispatchSettings } = useUnsplashSettings();

  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Collection ID*</UText>
      <UValidatedTextInput
        placeholder="Collection ID"
        value={settings.settings.collections.collectionId}
        isValid={(text) => ({
          isValid: !!text,
          errorMessage: "Required",
        })}
        setIsValid={(isValid) => {
          dispatchSettings({ type: "setCollectionIsValid", isValid });
        }}
        onChangeText={(text) => {
          dispatchSettings({
            type: "setCollectionCollectionId",
            collectionId: text.trim(),
          });
        }}
        touched={settings.touchAll}
      />
      <UnsplashOrientation
        orientation={settings.settings.collections.orientation}
        setOrientation={(orientation) => {
          dispatchSettings({ type: "setCollectionOrientation", orientation });
        }}
      />
    </View>
  );
};

export const UnsplashUser = () => {
  const { settings, dispatchSettings } = useUnsplashSettings();

  return (
    <View style={{ gap: spacing[2] }}>
      <UnsplashUsername
        username={settings.settings.user.username}
        setUsername={(username) => {
          dispatchSettings({ type: "setUserUsername", username });
        }}
        setIsValid={(isValid) => {
          dispatchSettings({ type: "setUserIsValid", isValid });
        }}
        touched={settings.touchAll}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText>Order by:</UText>
        <UPicker
          selectedValue={settings.settings.user.orderBy}
          onValueChange={(itemValue) => {
            dispatchSettings({ type: "setUserOrderBy", orderBy: itemValue });
          }}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="Popular" value="popular" />
          <UPickerItem label="Latest" value="latest" />
          <UPickerItem label="Views" value="views" />
          <UPickerItem label="Downloads" value="downloads" />
          <UPickerItem label="Oldest" value="oldest" />
        </UPicker>
      </View>
      <UnsplashOrientation
        orientation={settings.settings.user.orientation}
        setOrientation={(orientation) => {
          dispatchSettings({ type: "setUserOrientation", orientation });
        }}
      />
    </View>
  );
};

export const UnsplashUsername = ({
  username,
  setUsername,
  optional = false,
  setIsValid,
  touched,
}:
  | {
      username: string;
      setUsername: (value: string) => void;
      optional?: false;
      setIsValid?: (value: boolean) => void;
      touched?: boolean;
    }
  | {
      username: string | undefined;
      setUsername: (value: string | undefined) => void;
      optional: true;
      setIsValid?: (value: boolean) => void;
      touched?: boolean;
    }) => {
  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Username{!optional && "*"}</UText>
      <UValidatedTextInput
        placeholder="Username"
        value={username}
        isValid={(text) => ({
          isValid: optional || !!text,
          errorMessage: "Required",
        })}
        setIsValid={setIsValid}
        onChangeText={(text) => {
          (
            setUsername as typeof optional extends false
              ? (value: string) => void
              : (value: string | undefined) => void
          )(!optional ? text.trim() : text.trim() || undefined);
        }}
        touched={touched}
      />
    </View>
  );
};

export const UnsplashRandom = () => {
  const { settings, dispatchSettings } = useUnsplashSettings();

  return (
    <View style={{ gap: spacing[2] }}>
      <UnsplashCollections
        collections={settings.settings.random.collections}
        setCollections={(collections) => {
          dispatchSettings({ type: "setRandomCollections", collections });
        }}
      />
      <UText>Topics</UText>
      <UTextInput
        placeholder="Topic ID(s), comma-separated"
        value={settings.settings.random.topics}
        onChangeText={(text) => {
          dispatchSettings({
            type: "setRandomTopics",
            topics: text.trim() || undefined,
          });
        }}
      />
      <UnsplashUsername
        username={settings.settings.random.username}
        setUsername={(username) => {
          dispatchSettings({ type: "setRandomUsername", username });
        }}
        optional
      />
      <UnsplashQuery
        query={settings.settings.random.query}
        setQuery={(query) => {
          dispatchSettings({ type: "setRandomQuery", query });
        }}
        optional
      />
      <UnsplashOrientation
        orientation={settings.settings.random.orientation}
        setOrientation={(orientation) => {
          dispatchSettings({ type: "setRandomOrientation", orientation });
        }}
      />
    </View>
  );
};

export const UnsplashPhoto = () => {
  const { settings, dispatchSettings } = useUnsplashSettings();

  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Photo ID*</UText>
      <UValidatedTextInput
        placeholder="Photo ID"
        value={settings.settings.photo.photoId}
        isValid={(text) => ({
          isValid: !!text,
          errorMessage: "Required",
        })}
        setIsValid={(isValid) => {
          dispatchSettings({ type: "setPhotoIsValid", isValid });
        }}
        onChangeText={(text) => {
          dispatchSettings({ type: "setPhotoPhotoId", photoId: text.trim() });
        }}
        touched={settings.touchAll}
      />
    </View>
  );
};
