import SourceScreen from "@/components/SourceScreen";
import SourceTiming from "@/components/SourceTiming";
import { UButton } from "@/components/ui/button";
import { USeparator } from "@/components/ui/separator";
import { UText } from "@/components/ui/text";
import {
  SourceContextProvider,
  useSourceContext,
} from "@/contexts/sourceContext";
import { useColors } from "@/hooks/useColors";
import { Source } from "@/sources/types";
import { spacing } from "@expo/styleguide-base";
import { View } from "react-native";

export const facebookSource: Source = {
  name: "facebook",
  title: "Facebook",
};

export const Facebook = () => {
  return (
    <SourceContextProvider>
      <FacebookScreen />
    </SourceContextProvider>
  );
};

export const FacebookScreen = () => {
  const colors = useColors();

  const { source, dispatchSource } = useSourceContext();

  const touchAll = () => {
    dispatchSource({ type: "setTouchAll", touchAll: true });
  };

  return (
    <View style={{ gap: spacing[2] }}>
      <SourceTiming />
      <USeparator />
      <SourceScreen />

      <UButton
        onPress={() => {
          if (!source.isValid) {
            touchAll();
            return;
          }

          // TODO: Save
        }}
      >
        <UText style={{ color: colors.primaryForeground, textAlign: "center" }}>
          Save
        </UText>
      </UButton>
    </View>
  );
};
