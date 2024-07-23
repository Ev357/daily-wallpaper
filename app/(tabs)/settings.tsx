import { UText } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <UText>Settings</UText>
    </SafeAreaView>
  );
};

export default Settings;
