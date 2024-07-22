import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const Events = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Events</ThemedText>
    </ThemedView>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
