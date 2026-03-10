//green button component for navigation
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Spacer from "../others/Spacer";
import { getResponsiveWidth } from "../../helpers/getScreenDimension";
import { AppIcon } from "../others/AppIcon";
import { IconName } from "@/helpers/icons";

/**Reusable button nav component */
const GreenNavButton = ({
  title,
  onPress,
  titleColor = "#FFFFFF",
  bgColor = "#126415",
  btnType = "solid",
  disabled = false,
  borderColor,
  width,
  iconRight = false,
  iconName,
  loading = false,
}: {
  title: string;
  onPress: (e?: any) => void;
  titleColor?: string;
  bgColor?: string;
  btnType?: "solid" | "clear" | "outline";
  disabled?: boolean;
  borderColor?: string;
  width?: number;
  iconRight?: boolean;
  iconName?: IconName;
  loading?: boolean;
}) => {
  const resolvedBg =
    btnType === "clear" || btnType === "outline" ? "transparent" : bgColor;
  const resolvedBorder =
    borderColor ?? (btnType === "clear" ? "transparent" : "#126415");
  const resolvedBorderWidth = btnType === "clear" ? 0 : 2;

  const buttonStyle: ViewStyle = {
    backgroundColor: resolvedBg,
    borderRadius: 4,
    borderWidth: resolvedBorderWidth,
    borderColor: resolvedBorder,
    height: 56,
    overflow: "hidden",
    width: getResponsiveWidth(width ?? 0.9),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconElement = iconName ? <AppIcon name={iconName} size={24} /> : null;

  return (
    <Spacer>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[buttonStyle, (disabled || loading) && styles.disabled]}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={titleColor} />
        ) : (
          <>
            {iconElement && !iconRight && (
              <View style={styles.iconLeft}>{iconElement}</View>
            )}
            <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
            {iconElement && iconRight && (
              <View style={styles.iconRight}>{iconElement}</View>
            )}
          </>
        )}
      </TouchableOpacity>
    </Spacer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default GreenNavButton;
