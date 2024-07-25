import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColors } from "@/hooks/useColors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TabLayout = () => {
  const colors = useColors();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: colors.mutedForeground,
          tabBarShowLabel: false,
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="sources"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "compass" : "compass-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Events",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "time" : "time-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "settings" : "settings-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default TabLayout;
