import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import NavigationHeader from "@/components/navigations/NavigationHeader";
import NavigationChildFrame from "@/components/navigations/NavigationChildFrame";
import { DashboardTabParamList } from "@/navigation/DashboardNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "@/components/Spacer";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";

const AccountSettingScreen: React.FC = ({}) => {
  const navigation = useProfileNavigation();

  return (
    <SafeAreaView style={style.container}>
      <NavigationHeader title="Account Setting" />
      <Spacer />
      <NavigationChildFrame
        title="Sign Out"
        leftIcon="signOut"
        onPress={() => navigation.navigate("SignOut")}
      />
      <NavigationChildFrame
        title="Delete my account"
        leftIcon="delete"
        onPress={() => navigation.navigate("DeleteAccount")}
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
