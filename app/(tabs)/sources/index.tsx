import { FlatList, TouchableOpacity, View } from "react-native";
import { unsplashSource } from "@/sources/unsplash";
import { facebookSource } from "@/sources/facebook";
import type { Source } from "@/sources/types";
import { UCard, UCardHeader, UCardTitle } from "@/components/ui/card";
import { spacing } from "@expo/styleguide-base";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { UButton } from "@/components/ui/button";
import { UText } from "@/components/ui/text";
import { onEvent } from "@/utils/initBackgroundFetch";

const sources: Source[] = [unsplashSource, facebookSource];

const Sources = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: spacing[4] }}>
      <UButton
        onPress={() => {
          onEvent("com.ev357.dailywallpaper.update");
        }}
      >
        <UText style={{ color: "black" }}>Fetch</UText>
      </UButton>
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
