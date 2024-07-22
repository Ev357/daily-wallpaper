import { UText } from "@/components/ui/Text";
import { UView } from "@/components/ui/View";
import { Button, StyleSheet } from "react-native";
import { setWallpaper, TYPE_SCREEN } from "rn-wallpapers";

const Sources = () => {
  return (
    <UView style={styles.container} safe>
      <UText>Sources</UText>
      <Button onPress={setWallpaperOnPress} title="Change Wallpaper" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
