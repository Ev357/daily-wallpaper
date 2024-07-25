import { useColors } from "@/hooks/useColors";
import { spacing } from "@expo/styleguide-base";
import { createContext, useContext, type ReactNode } from "react";
import {
  type StyleProp,
  type TextStyle,
  View,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { UText, type UTextProps } from "./text";
import { UIcon, UIconProps } from "@/components/ui/icon";

export type AlertVariant = "default" | "destructive";

export type AlertContextType = {
  variant: AlertVariant;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const AlertContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: AlertContextType;
}) => {
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlertContext must be used within a UAlert");
  }

  return context;
};

export const UAlert = ({
  style,
  icon,
  children,
  containerStyle,
  iconStyle,
  variant = "default",
  ...otherProps
}: ViewProps & {
  icon?: UIconProps["name"];
  containerStyle?: StyleProp<ViewProps>;
  iconStyle?: UIconProps["style"];
  variant?: AlertVariant;
}) => {
  const colors = useColors();

  return (
    <AlertContextProvider value={{ variant }}>
      <View
        style={[
          {
            borderRadius: spacing[2],
            flexDirection: "row",
            gap: spacing[2],
            paddingHorizontal: spacing[4],
            paddingVertical: spacing[3],
          },
          (
            {
              default: {
                borderWidth: 1,
                borderColor: colors.border,
              },
              destructive: {
                borderWidth: 1,
                borderColor: colors.destructive,
              },
            } satisfies Record<AlertVariant, StyleProp<ViewStyle>>
          )[variant],
          containerStyle,
        ]}
        {...otherProps}
      >
        {icon && (
          <UIcon
            style={[
              {
                paddingTop: spacing[1],
              },
              (
                {
                  default: { color: colors.foreground },
                  destructive: { color: colors.destructive },
                } satisfies Record<AlertVariant, StyleProp<TextStyle>>
              )[variant],
              iconStyle,
            ]}
            name={icon}
            size={spacing[5]}
          />
        )}
        <View style={[{ flexShrink: 1, gap: spacing["0.5"] }, style]}>
          {children}
        </View>
      </View>
    </AlertContextProvider>
  );
};

export const UAlertTitle = ({ style, size, ...otherProps }: UTextProps) => {
  const colors = useColors();

  const { variant } = useAlertContext();

  return (
    <UText
      size={size ?? "sm"}
      style={[
        (
          {
            default: {
              color: colors.foreground,
            },
            destructive: {
              color: colors.destructive,
            },
          } satisfies Record<AlertVariant, StyleProp<TextStyle>>
        )[variant],
        style,
      ]}
      {...otherProps}
    />
  );
};

export const UAlertDescription = UAlertTitle;
