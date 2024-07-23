import { FlatList, TouchableOpacity, View } from "react-native";
import { setWallpaper, TYPE_SCREEN } from "rn-wallpapers";
import { unsplashSource } from "@/sources/unsplash";
import { facebookSource } from "@/sources/facebook";
import type { Source } from "@/sources/types";
import { UCard, UCardHeader, UCardTitle } from "@/components/ui/card";
import { spacing } from "@expo/styleguide-base";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const sources: Source[] = [unsplashSource, facebookSource];

const Sources = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: spacing[4] }}>
      <FlatList
        data={sources}
        renderItem={({ item }) => (
          <Link href={`/sources/${item.name}`} asChild>
            <TouchableOpacity>
              <UCard>
                <UCardHeader>
                  <UCardTitle>{item.title}</UCardTitle>
                </UCardHeader>
              </UCard>
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View style={{ height: spacing[2] }} />}
      />
    </SafeAreaView>
  );
};

export default Sources;

const setWallpaperOnPress = async () => {
  await setWallpaper(
    {
      uri: "https://i0.wp.com/techwek.com/wp-content/uploads/2021/01/wallpaper-gotas-de-chuva.jpg",
    },
    TYPE_SCREEN.HOME
  );
};
