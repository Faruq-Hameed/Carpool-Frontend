import "react-native-gesture-handler"; // This MUST be at the very top
import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, ActivityIndicator } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import type { NavigationContainerRef } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as SplashScreen from "expo-splash-screen";

import AuthProvider from "./src/contexts/AuthContext";
import { InAppNotificationProvider, useInAppNotification } from "./src/contexts/InAppNotificationContext";
import { ChatSocketProvider } from "./src/contexts/ChatSocketContext";
import RootStackNavigator from "./src/navigation/RootNavigator";
import type { RootStackParamList } from "./src/navigation/RootNavigator";
import { ResetPasscodeProvider } from "@/contexts/ResetPasscodeContext";
import { configureForegroundNotifications } from "@/utils/registerPushToken";
import { NotifType } from "@/utils/notifications/notificationTypes";

// SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

// Configure how notifications appear while the app is open (must run at module level)
configureForegroundNotifications();

// ─── Loading screen ───────────────────────────────────────────────────────────

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
    <ActivityIndicator size="large" color="#126415" />
    <Text style={{ marginTop: 16, fontSize: 16, color: "#666", fontFamily: "Poppins_400Regular" }}>
      Loading...
    </Text>
  </View>
);

// ─── Inner app — needs navigation ref to already be connected ─────────────────

function AppInner({ navigationRef }: { navigationRef: React.RefObject<NavigationContainerRef<RootStackParamList>> }) {
  const { showBanner } = useInAppNotification();

  useEffect(() => {
    // ── 11a: Tap handler — routes to the correct screen when notification is tapped ──
    const tapSub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as Record<string, string> | undefined;
      if (!data?.type || !navigationRef.current?.isReady()) return;

      const { type, rideId, bookingId } = data;
      const nav = navigationRef.current;

      switch (type) {
        case NotifType.RIDE_STARTED:
        case NotifType.RIDE_COMPLETED:
        case NotifType.RIDE_CANCELLED:
        case NotifType.BOOKING_ACCEPTED:
        case NotifType.BOOKING_REJECTED:
        case NotifType.BOOKING_REQUEST:
        case NotifType.PASSENGER_CANCELLED:
          if (rideId) {
            nav.navigate("RideStack", {
              screen: "RideDetail",
              params: { rideId },
            } as any);
          }
          break;

        case NotifType.WALLET_FUNDED:
        case NotifType.WALLET_CREDITED:
        case NotifType.WALLET_DEBITED:
        case NotifType.WITHDRAWAL_APPROVED:
        case NotifType.WITHDRAWAL_REJECTED:
          nav.navigate("ProfileStack", {
            screen: "WalletScreen",
          } as any);
          break;

        case NotifType.KYC_VERIFIED:
        case NotifType.KYC_REJECTED:
        case NotifType.SELFIE_VERIFIED:
        case NotifType.SELFIE_REJECTED:
          nav.navigate("AccountVerification");
          break;

        default:
          break;
      }
    });

    // ── 11b: Foreground listener — show in-app banner when app is open ────────────
    const foregroundSub = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body } = notification.request.content;
      const data = notification.request.content.data as Record<string, string> | undefined;
      if (!title) return;

      const onPress = () => {
        if (!data?.type || !navigationRef.current?.isReady()) return;
        const { type, rideId } = data;
        const nav = navigationRef.current!;

        switch (type) {
          case NotifType.RIDE_STARTED:
          case NotifType.RIDE_COMPLETED:
          case NotifType.RIDE_CANCELLED:
          case NotifType.BOOKING_ACCEPTED:
          case NotifType.BOOKING_REJECTED:
          case NotifType.BOOKING_REQUEST:
          case NotifType.PASSENGER_CANCELLED:
            if (rideId) nav.navigate("RideStack", { screen: "RideDetail", params: { rideId } } as any);
            break;
          case NotifType.WALLET_FUNDED:
          case NotifType.WALLET_CREDITED:
          case NotifType.WALLET_DEBITED:
          case NotifType.WITHDRAWAL_APPROVED:
          case NotifType.WITHDRAWAL_REJECTED:
            nav.navigate("ProfileStack", { screen: "WalletScreen" } as any);
            break;
          case NotifType.KYC_VERIFIED:
          case NotifType.KYC_REJECTED:
          case NotifType.SELFIE_VERIFIED:
          case NotifType.SELFIE_REJECTED:
            nav.navigate("AccountVerification");
            break;
          default:
            break;
        }
      };

      showBanner(title, body ?? "", onPress);
    });

    return () => {
      tapSub.remove();
      foregroundSub.remove();
    };
  }, [navigationRef, showBanner]);

  return <RootStackNavigator />;
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function App(): React.ReactElement {
  const [fontsLoaded, fontError] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  if (fontError) {
    console.error("Font loading error:", fontError);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading fonts</Text>
      </View>
    );
  }

  if (!fontsLoaded) return <LoadingScreen />;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ResetPasscodeProvider>
            <ChatSocketProvider>
            <InAppNotificationProvider>
              <NavigationContainer ref={navigationRef}>
                <AppInner navigationRef={navigationRef} />
              </NavigationContainer>
            </InAppNotificationProvider>
          </ChatSocketProvider>
          </ResetPasscodeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
