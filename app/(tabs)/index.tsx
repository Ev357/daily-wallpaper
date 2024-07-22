import { Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { setWallpaper, TYPE_SCREEN } from "rn-wallpapers";

const Sources = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Sources</ThemedText>
      <Button onPress={set} title="Change Wallpaper" />
    </ThemedView>
  );
};

export default Sources;

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
