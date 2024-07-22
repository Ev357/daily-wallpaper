import { StyleSheet, Image, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const SettingsScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Settings</ThemedText>
    </ThemedView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
