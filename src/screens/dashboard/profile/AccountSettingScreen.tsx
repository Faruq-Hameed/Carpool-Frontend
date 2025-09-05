import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import NavigationHeader from "@/components/NavigationHeader";
import NavigationChildFrame from "@/components/NavigationChildFrame";
import { DashboardTabParamList } from "@/navigation/DashboardNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "@/components/Spacer";


const AccountSettingScreen: React.FC = ({}) => {
  return (
    <SafeAreaView style={style.container}>
      <NavigationHeader title="Account Setting"  />
      <Spacer />
      <NavigationChildFrame
        title="Sign Out"
        leftIcon="signOut"
        onPress={() => {}}
      />
      <NavigationChildFrame
        title="Delete my account"
        leftIcon="delete"
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default AccountSettingScreen;
