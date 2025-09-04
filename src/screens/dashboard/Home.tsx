import React from "react";
import { View, Text as RNText } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DashboardTabParamList } from "../../navigation/DashboardNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSummary from "./profile/components/ProfileSummary";

// Use BottomTabScreenProps instead of StackScreenProps for tab navigation
type Props = BottomTabScreenProps<DashboardTabParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1,  alignItems: "center" }}>
      <ProfileSummary />
      <RNText style={{ fontSize: 18, fontWeight: "bold" }}>
        Welcome to the Home!
      </RNText>
    </SafeAreaView>
  );
};

export default HomeScreen;
