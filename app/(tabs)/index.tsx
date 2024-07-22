import { UView } from "@/components/ui/View";
import { FlatList, View } from "react-native";
import { setWallpaper, TYPE_SCREEN } from "rn-wallpapers";
import { unsplash } from "@/sources/unsplash";
import { facebook } from "@/sources/facebook";
import type { Source } from "@/sources/types";
import { UCard } from "@/components/ui/card/Card";
import { spacing } from "@expo/styleguide-base";
import { UCardHeader } from "@/components/ui/card/CardHeader";
import { UCardTitle } from "@/components/ui/card/CardTitle";

const sources: Source[] = [unsplash, facebook];

const Sources = () => {
  return (
    <UView style={{ flex: 1, paddingHorizontal: spacing[4] }} safe>
      <FlatList
        data={sources}
        renderItem={({ item }) => (
          <UCard>
            <UCardHeader>
              <UCardTitle>{item.name}</UCardTitle>
            </UCardHeader>
          </UCard>
        )}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View style={{ height: spacing[2] }} />}
      />
    </UView>
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
