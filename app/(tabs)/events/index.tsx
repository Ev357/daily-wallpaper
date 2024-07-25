import { UCard, UCardHeader, UCardTitle } from "@/components/ui/card";
import { spacing } from "@expo/styleguide-base";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "@/db";

const Events = () => {
  const { data } = useLiveQuery(db.query.events.findMany());

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: spacing[4] }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/sources/[id]",
              params: { id: item.id },
            }}
            asChild
          >
            <TouchableOpacity>
              <UCard>
                <UCardHeader>
                  <UCardTitle>{`${item.source} - ${item.id}`}</UCardTitle>
                </UCardHeader>
              </UCard>
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: spacing[2] }} />}
      />
    </SafeAreaView>
  );
};

export default Events;
