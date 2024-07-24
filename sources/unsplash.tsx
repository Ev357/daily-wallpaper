import EventScreen from "@/components/EventScreen";
import EventTiming from "@/components/EventTiming";
import { UPicker, UPickerItem } from "@/components/ui/picker";
import { USeparator } from "@/components/ui/separator";
import { UText } from "@/components/ui/text";
import { UTextInput } from "@/components/ui/text-input";
import type { ScreenType } from "@/constants/screenTypes";
import { Source } from "@/sources/types";
import { spacing } from "@expo/styleguide-base";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export const unsplashSource: Source = {
  name: "unsplash",
  title: "Unsplash",
};

export const Unsplash = () => {
  const [triggerType, setTriggerType] = useState<"periodic" | "specificTime">(
    "specificTime"
  );
  const [interval, setInterval] = useState(15);
  const [intervalUnit, setIntervalUnit] = useState<
    "seconds" | "minutes" | "hours" | "days"
  >("minutes");
  const [specificTime, setSpecificTime] = useState(new Date());
  const [screenType, setScreenType] = useState<ScreenType>("home");

  const [settings, setSettings] = useState<Settings>({
    type: "topic",
    topic: "",
    orderBy: "popular",
    orientation: "portrait",
  });

  return (
    <ScrollView>
      <View style={{ gap: spacing[2], paddingBottom: spacing[4] }}>
        <EventTiming
          triggerType={triggerType}
          setTriggerType={setTriggerType}
          interval={interval}
          setInterval={setInterval}
          intervalUnit={intervalUnit}
          setIntervalUnit={setIntervalUnit}
          specificTime={specificTime}
          setSpecificTime={setSpecificTime}
        />
        <USeparator />
        <EventScreen screenType={screenType} setScreenType={setScreenType} />
        <USeparator />
        <UnsplashSettings setSettings={setSettings} />
      </View>
    </ScrollView>
  );
};

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

export type Settings =
  | {
      type: "topic";
      topic: string;
      orderBy: "popular" | "latest" | "oldest";
      orientation: UnsplashOrientation;
    }
  | {
      type: "search";
      query: string;
      orderBy: "latest" | "relevant";
      collections: string | undefined;
      color: UnsplashColor;
      orientation: "portrait" | "landscape" | "all";
    }
  | {
      type: "collections";
      collectionId: string;
      orientation: UnsplashOrientation;
    }
  | {
      type: "user";
      username: string;
      orderBy: "popular" | "latest" | "views" | "downloads" | "oldest";
      orientation: UnsplashOrientation;
    }
  | {
      type: "random";
      collections: string | undefined;
      topics: string | undefined;
      username: string | undefined;
      query: string | undefined;
      orientation: UnsplashOrientation;
    }
  | {
      type: "photo";
      photoId: string;
    };

export const UnsplashSettings = ({
  setSettings,
}: {
  setSettings: (value: Settings) => void;
}) => {
  const [sourceType, setSourceType] = useState<
    "topics" | "search" | "collections" | "user" | "random" | "photo"
  >("topics");

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
          selectedValue={sourceType}
          onValueChange={(itemValue) => setSourceType(itemValue)}
          mode="dropdown"
          containerStyle={{
            flexGrow: 1,
          }}
        >
          <UPickerItem label="Topics" value="topics" />
          <UPickerItem label="Search" value="search" />
          <UPickerItem label="Collections" value="collections" />
          <UPickerItem label="User Photos" value="user" />
          <UPickerItem label="Random Photo" value="random" />
          <UPickerItem label="Photo" value="photo" />
        </UPicker>
      </View>
      {
        {
          topics: <UnsplashTopic setSettings={setSettings} />,
          search: <UnsplashSearch setSettings={setSettings} />,
          collections: <UnsplashCollection setSettings={setSettings} />,
          user: <UnsplashUser setSettings={setSettings} />,
          random: <UnsplashRandom setSettings={setSettings} />,
          photo: <UnsplashPhoto setSettings={setSettings} />,
        }[sourceType]
      }
    </View>
  );
};

export const UnsplashTopic = ({
  setSettings,
}: {
  setSettings: (value: Settings) => void;
}) => {
  const [topic, setTopic] = useState("");
  const [orderBy, setOrderBy] = useState<"popular" | "latest" | "oldest">(
    "popular"
  );
  const [orientation, setOrientation] =
    useState<UnsplashOrientation>("portrait");

  useEffect(() => {
    setSettings({
      type: "topic",
      topic,
      orderBy,
      orientation,
    });
  }, [topic, orderBy, orientation]);

  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Topic*</UText>
      <UTextInput
        placeholder="Id or slug"
        value={topic}
        onChangeText={(text) => setTopic(text.trim())}
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
          selectedValue={orderBy}
          onValueChange={(itemValue) => setOrderBy(itemValue)}
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
        orientation={orientation}
        setOrientation={setOrientation}
      />
    </View>
  );
};

export const UnsplashSearch = ({
  setSettings,
}: {
  setSettings: (value: Settings) => void;
}) => {
  const [query, setQuery] = useState("");
  const [orderBy, setOrderBy] = useState<"latest" | "relevant">("latest");
  const [collections, setCollections] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<UnsplashColor>("all");
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | "all"
  >("portrait");

  useEffect(() => {
    setSettings({
      type: "search",
      query,
      orderBy,
      collections,
      color,
      orientation,
    });
  }, [query, orderBy, collections, color, orientation]);

  return (
    <View style={{ gap: spacing[2] }}>
      <UnsplashQuery query={query} setQuery={setQuery} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText>Order by:</UText>
        <UPicker
          selectedValue={orderBy}
          onValueChange={(itemValue) => setOrderBy(itemValue)}
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
        collections={collections}
        setCollections={setCollections}
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
          selectedValue={color}
          onValueChange={(itemValue) => setColor(itemValue)}
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
          selectedValue={orientation}
          onValueChange={(itemValue) => setOrientation(itemValue)}
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
  orientation: UnsplashOrientation;
  setOrientation: (value: UnsplashOrientation) => void;
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
        onValueChange={(itemValue) => setOrientation(itemValue)}
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
}:
  | {
      query: string;
      setQuery: (value: string) => void;
      optional?: false;
    }
  | {
      query: string | undefined;
      setQuery: (value: string | undefined) => void;
      optional: true;
    }) => {
  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Query{!optional ? "*" : ""}</UText>
      <UTextInput
        placeholder="Query"
        value={query}
        onChangeText={(text) =>
          (
            setQuery as typeof optional extends false
              ? (value: string) => void
              : (value: string | undefined) => void
          )(!optional ? text.trim() : text.trim() || undefined)
        }
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
        onChangeText={(text) => setCollections(text.trim() || undefined)}
      />
    </View>
  );
};

export const UnsplashCollection = ({
  setSettings,
}: {
  setSettings: (value: Settings) => void;
}) => {
  const [collectionId, setCollectionId] = useState<string>("");
  const [orientation, setOrientation] =
    useState<UnsplashOrientation>("portrait");

  useEffect(() => {
    setSettings({
      type: "collections",
      collectionId,
      orientation,
    });
  }, [collectionId, orientation]);

  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Collection ID*</UText>
      <UTextInput
        placeholder="Collection ID"
        value={collectionId}
        onChangeText={(text) => setCollectionId(text.trim())}
      />
      <UnsplashOrientation
        orientation={orientation}
        setOrientation={setOrientation}
      />
    </View>
  );
};

export const UnsplashUser = ({
  setSettings,
}: {
  setSettings: (value: Settings) => void;
}) => {
  const [username, setUsername] = useState<string>("");
  const [orderBy, setOrderBy] = useState<
    "popular" | "latest" | "views" | "downloads" | "oldest"
  >("popular");
  const [orientation, setOrientation] =
    useState<UnsplashOrientation>("portrait");

  useEffect(() => {
    setSettings({
      type: "user",
      username,
      orderBy,
      orientation,
    });
  }, [username, orderBy, orientation]);

  return (
    <View style={{ gap: spacing[2] }}>
      <UnsplashUsername username={username} setUsername={setUsername} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <UText>Order by:</UText>
        <UPicker
          selectedValue={orderBy}
          onValueChange={(itemValue) => setOrderBy(itemValue)}
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
        orientation={orientation}
        setOrientation={setOrientation}
      />
    </View>
  );
};

export const UnsplashUsername = ({
  username,
  setUsername,
  optional = false,
}:
  | {
      username: string;
      setUsername: (value: string) => void;
      optional?: false;
    }
  | {
      username: string | undefined;
      setUsername: (value: string | undefined) => void;
      optional: true;
    }) => {
  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Username{!optional ? "*" : ""}</UText>
      <UTextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) =>
          (
            setUsername as typeof optional extends false
              ? (value: string) => void
              : (value: string | undefined) => void
          )(!optional ? text.trim() : text.trim() || undefined)
        }
      />
    </View>
  );
};

export const UnsplashRandom = ({
  setSettings,
}: {
  setSettings: (value: Settings) => void;
}) => {
  const [collections, setCollections] = useState<string | undefined>(undefined);
  const [topics, setTopics] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState<string | undefined>("");
  const [orientation, setOrientation] =
    useState<UnsplashOrientation>("portrait");

  useEffect(() => {
    setSettings({
      type: "random",
      collections,
      topics,
      username,
      query,
      orientation,
    });
  }, [collections, topics, username, query, orientation]);

  return (
    <View style={{ gap: spacing[2] }}>
      <UnsplashCollections
        collections={collections}
        setCollections={setCollections}
      />
      <UText>Topics:</UText>
      <UTextInput
        placeholder="Topic ID(s), comma-separated"
        value={topics}
        onChangeText={(text) => setTopics(text.trim() || undefined)}
      />
      <UnsplashUsername
        username={username}
        setUsername={setUsername}
        optional
      />
      <UnsplashQuery query={query} setQuery={setQuery} optional />
      <UnsplashOrientation
        orientation={orientation}
        setOrientation={setOrientation}
      />
    </View>
  );
};

export const UnsplashPhoto = ({
  setSettings,
}: {
  setSettings: (value: Settings) => void;
}) => {
  const [photoId, setPhotoId] = useState<string>("");

  useEffect(() => {
    setSettings({
      type: "photo",
      photoId,
    });
  }, [photoId]);

  return (
    <View style={{ gap: spacing[2] }}>
      <UText>Photo ID*</UText>
      <UTextInput
        placeholder="Photo ID"
        value={photoId}
        onChangeText={(text) => setPhotoId(text.trim())}
      />
    </View>
  );
};
