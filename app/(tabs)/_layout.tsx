import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? "light"].cardForeground,
        tabBarInactiveTintColor: colors[colorScheme ?? "light"].mutedForeground,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors[colorScheme ?? "light"].card,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sources",
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
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
