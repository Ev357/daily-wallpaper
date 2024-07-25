import { UButton } from "@/components/ui/button";
import { UText } from "@/components/ui/text";
import { UTextInput } from "@/components/ui/text-input";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";
import { useState } from "react";
import { Keyboard, ScrollView, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { UIcon } from "@/components/ui/icon";
import { useIsKeyConfigured } from "@/hooks/useIsKeyConfigured";
import * as Linking from "expo-linking";

export const UnsplashSourceSettings = () => {
  const colors = useColors();

  const [accessKey, setAccessKey] = useState("");
  const [isAccessKeyConfigured, checkIsAccessKeyConfigured] =
    useIsKeyConfigured("unsplashAccessKey");

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
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://unsplash.com/documentation#getting-started"
              );
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing["0.5"],
              }}
            >
              <UText>Access Key</UText>
              <UIcon name="information-circle-outline" size={spacing[5]} />
            </View>
          </TouchableOpacity>
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

            checkIsAccessKeyConfigured();

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
