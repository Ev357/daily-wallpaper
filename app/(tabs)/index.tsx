import { Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { setWallpaper, TYPE_SCREEN } from "rn-wallpapers";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Hello World</ThemedText>
      <Button onPress={set} title="Change Wallpaper" />
    </ThemedView>
  );
}

async function set() {
  await setWallpaper(
    {
      uri: "https://i0.wp.com/techwek.com/wp-content/uploads/2021/01/wallpaper-gotas-de-chuva.jpg",
    },
    TYPE_SCREEN.HOME
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
