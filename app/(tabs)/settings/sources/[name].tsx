import { spacing } from "@expo/styleguide-base";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import {
  UnsplashSourceSettings,
  getUnsplashSourceSettingsTitle,
} from "@/sources/unsplash/sourceSettings";
import {
  FacebookSourceSettings,
  getFacebookSourceSettingsTitle,
} from "@/sources/facebook/sourceSettings";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect } from "react";

const SourceSettings = () => {
  const { name } = useLocalSearchParams<{ name: "unsplash" | "facebook" }>();

  const Fallback = <Redirect href="/sources" />;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name
        ? {
            unsplash: getUnsplashSourceSettingsTitle(),
            facebook: getFacebookSourceSettingsTitle(),
          }[name]
        : undefined,
    });
  }, [name]);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: spacing[4] }}>
      {name
        ? {
            unsplash: <UnsplashSourceSettings />,
            facebook: <FacebookSourceSettings />,
          }[name] ?? Fallback
        : Fallback}
    </SafeAreaView>
  );
};

export default SourceSettings;
