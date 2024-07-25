import { UButton } from "@/components/ui/button";
import { UIcon } from "@/components/ui/icon";
import { UText } from "@/components/ui/text";
import { spacing } from "@expo/styleguide-base";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: spacing[4], gap: spacing[2] }}
    >
      <Link href="/settings/sources" asChild>
        <UButton
          variant="outline"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <UText>Sources</UText>
          <UIcon name="arrow-forward" size={spacing[6]} />
        </UButton>
      </Link>
    </SafeAreaView>
  );
};

export default Settings;
