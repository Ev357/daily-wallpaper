import { UText } from "@/components/ui/Text";
import { UView } from "@/components/ui/View";
import { StyleSheet } from "react-native";

const Events = () => {
  return (
    <UView style={styles.container}>
      <UText>Events</UText>
    </UView>
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
