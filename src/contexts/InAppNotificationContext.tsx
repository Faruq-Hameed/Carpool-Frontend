import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, FontSize, Radius, Spacing } from "@/theme";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BannerState {
  title: string;
  body: string;
  onPress?: () => void;
}

interface InAppNotificationContextValue {
  /** Show an in-app notification banner for 4 seconds. */
  showBanner: (title: string, body: string, onPress?: () => void) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const InAppNotificationContext =
  createContext<InAppNotificationContextValue | null>(null);

export function useInAppNotification(): InAppNotificationContextValue {
  const ctx = useContext(InAppNotificationContext);
  if (!ctx) throw new Error("useInAppNotification must be used inside InAppNotificationProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

const BANNER_DURATION_MS = 4000;
const SLIDE_DURATION_MS  = 280;

export const InAppNotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const insets            = useSafeAreaInsets();
  const [banner, setBanner] = useState<BannerState | null>(null);
  const slideAnim         = useRef(new Animated.Value(-120)).current;
  const timeoutRef        = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: -120,
      duration: SLIDE_DURATION_MS,
      useNativeDriver: true,
    }).start(() => setBanner(null));
  }, [slideAnim]);

  const showBanner = useCallback(
    (title: string, body: string, onPress?: () => void) => {
      // Cancel any existing timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setBanner({ title, body, onPress });
      slideAnim.setValue(-120);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: SLIDE_DURATION_MS,
        useNativeDriver: true,
      }).start();

      timeoutRef.current = setTimeout(dismiss, BANNER_DURATION_MS);
    },
    [slideAnim, dismiss],
  );

  return (
    <InAppNotificationContext.Provider value={{ showBanner }}>
      {children}

      {banner && (
        <Animated.View
          style={[
            styles.banner,
            { top: insets.top + 8, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.bannerInner}
            onPress={() => {
              dismiss();
              banner.onPress?.();
            }}
          >
            <View style={styles.iconWrap}>
              <Ionicons name="notifications" size={20} color={Colors.primary} />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.title} numberOfLines={1}>
                {banner.title}
              </Text>
              <Text style={styles.body} numberOfLines={2}>
                {banner.body}
              </Text>
            </View>
            <TouchableOpacity onPress={dismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={18} color="#6B7280" />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      )}
    </InAppNotificationContext.Provider>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    left: Spacing.base,
    right: Spacing.base,
    zIndex: 9999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  bannerInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: "#111827",
  },
  body: {
    fontSize: FontSize.xs,
    color: "#6B7280",
    marginTop: 2,
    lineHeight: 16,
  },
});
