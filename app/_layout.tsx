import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "@/constants/themes";
import { useColors } from "@/hooks/useColors";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { db } from "@/db";
import { initBackgroundFetch } from "@/utils/initBackgroundFetch";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const colors = useColors();
  const [loaded] = useFonts({
    Geist: require("../assets/fonts/Geist-Regular.ttf"),
  });
  const { success } = useMigrations(db, migrations);

  useEffect(() => {
    if (!loaded || !success) return;

    SplashScreen.hideAsync();
  }, [loaded, success]);

  useEffect(() => {
    initBackgroundFetch();
  }, []);

  if (!loaded || !success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.foreground} />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? darkTheme : lightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
