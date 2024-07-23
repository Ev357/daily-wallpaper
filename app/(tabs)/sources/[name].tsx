import { spacing } from "@expo/styleguide-base";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Unsplash } from "@/sources/unsplash";
import { Facebook } from "@/sources/facebook";
import { SafeAreaView } from "react-native-safe-area-context";

const NewEvent = () => {
  const { name } = useLocalSearchParams<{ name: "unsplash" | "facebook" }>();

  const events = {
    unsplash: <Unsplash />,
    facebook: <Facebook />,
  };

  const Fallback = <Redirect href="/sources" />;

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: spacing[4] }}>
      {name ? events[name] ?? Fallback : Fallback}
    </SafeAreaView>
  );
};

export default NewEvent;
