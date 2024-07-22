import { UText } from "@/components/ui/Text";
import { UView } from "@/components/ui/View";
import { StyleSheet } from "react-native";

const Settings = () => {
  return (
    <UView style={styles.container}>
      <UText>Settings</UText>
    </UView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
