import SourceScreen from "@/components/SourceScreen";
import SourceTiming from "@/components/SourceTiming";
import { UButton } from "@/components/ui/button";
import { USeparator } from "@/components/ui/separator";
import { UText } from "@/components/ui/text";
import { SourceContextProvider } from "@/contexts/sourceContext";
import { useColors } from "@/hooks/useColors";
import { Source } from "@/sources/types";
import { spacing } from "@expo/styleguide-base";
import { View } from "react-native";

export const facebookSource: Source = {
  name: "facebook",
  title: "Facebook",
};

export const Facebook = () => {
  const colors = useColors();

  return (
    <View style={{ gap: spacing[2] }}>
      <SourceContextProvider>
        <SourceTiming />
        <USeparator />
        <SourceScreen />
      </SourceContextProvider>
      <UButton>
        <UText style={{ color: colors.primaryForeground, textAlign: "center" }}>
          Save
        </UText>
      </UButton>
    </View>
  );
};
