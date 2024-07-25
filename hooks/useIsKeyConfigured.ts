import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useIsKeyConfigured = (key: string) => {
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);

  const checkIsKeyConfigured = async () => {
    const resultKey = await SecureStore.getItemAsync(key);

    setIsKeyConfigured(!!resultKey);
  };

  checkIsKeyConfigured();

  return [isKeyConfigured, checkIsKeyConfigured] as const;
};
