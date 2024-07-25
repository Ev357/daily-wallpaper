import { UButton } from "@/components/ui/button";
import { UText } from "@/components/ui/text";
import { UTextInput } from "@/components/ui/text-input";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";
import { useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { UIcon } from "@/components/ui/icon";

export const UnsplashSourceSettings = () => {
  const colors = useColors();

  const [accessKey, setAccessKey] = useState("");
  const [isAccessKeyConfigured, setIsAccessKeyConfigured] = useState(false);

  const checkISAccessKeyConfigured = async () => {
    const accessKey = await SecureStore.getItemAsync("unsplashAccessKey");

    setIsAccessKeyConfigured(!!accessKey);
  };

  checkISAccessKeyConfigured();

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{ gap: spacing[2] }}>
        <View
          style={{
            flexDirection: "row",
            gap: spacing[6],
            alignItems: "center",
          }}
        >
          <UText>Access Key</UText>
          {isAccessKeyConfigured && (
            <View
              style={{
                flexDirection: "row",
                gap: spacing["0.5"],
                alignItems: "center",
              }}
            >
              <UIcon name="checkmark-done" size={spacing[4]} />
              <UText size="sm">Configured</UText>
            </View>
          )}
        </View>
        <UTextInput
          placeholder="Access Key"
          value={accessKey}
          onChangeText={(text) => {
            setAccessKey(text.trim());
          }}
          secureTextEntry
        />
        <UButton
          onPress={async () => {
            await SecureStore.setItemAsync("unsplashAccessKey", accessKey);

            setAccessKey("");

            checkISAccessKeyConfigured();

            Keyboard.dismiss();
          }}
        >
          <UText
            style={{ color: colors.primaryForeground, textAlign: "center" }}
          >
            Save
          </UText>
        </UButton>
      </View>
    </ScrollView>
  );
};

export const getUnsplashSourceSettingsTitle = () => {
  return "Unsplash Settings";
};
