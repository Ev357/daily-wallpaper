import { UCard, UCardHeader, UCardTitle } from "@/components/ui/card";
import { facebookSource } from "@/sources/facebook";
import type { Source } from "@/sources/types";
import { unsplashSource } from "@/sources/unsplash";
import { spacing } from "@expo/styleguide-base";
import { Link } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sources: Source[] = [unsplashSource, facebookSource];

const Settings = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: spacing[4] }}>
      <FlatList
        data={sources}
        renderItem={({ item }) => (
          <Link href={`/settings/sources/${item.name}`} asChild>
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

export default Settings;
