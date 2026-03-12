import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSize } from "@/theme";

interface ScreenHeaderProps {
  title: string;
  /** Callback for back button. If omitted, back button is not rendered. */
  onBack?: () => void;
  /** Optional right-side element (icon button, text link, etc.) */
  rightAction?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Consistent screen-level header with optional back button and right action.
 * Drop-in replacement for NavigationHeader where you need more control.
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  rightAction,
  style,
}) => (
  <View style={[styles.container, style]}>
    {/* Left: back button or spacer */}
    <View style={styles.side}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} hitSlop={12} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
      ) : null}
    </View>

    {/* Center: title */}
    <Text style={styles.title} numberOfLines={1}>
      {title}
    </Text>

    {/* Right: action or spacer */}
    <View style={[styles.side, styles.sideRight]}>
      {rightAction ?? null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  side: {
    width: 36,
    alignItems: "flex-start",
  },
  sideRight: {
    alignItems: "flex-end",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.text,
  },
});
