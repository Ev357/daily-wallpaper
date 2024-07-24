import SourceScreen from "@/components/SourceScreen";
import SourceTiming from "@/components/SourceTiming";
import { USeparator } from "@/components/ui/separator";
import { SourceContextProvider } from "@/contexts/sourceContext";
import { Source } from "@/sources/types";
import { spacing } from "@expo/styleguide-base";
import { View } from "react-native";

export const facebookSource: Source = {
  name: "facebook",
  title: "Facebook",
};

export const Facebook = () => {
  return (
    <View style={{ gap: spacing[2] }}>
      <SourceContextProvider>
        <SourceTiming />
        <USeparator />
        <SourceScreen />
      </SourceContextProvider>
    </View>
  );
};
