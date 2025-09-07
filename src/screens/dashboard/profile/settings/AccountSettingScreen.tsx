import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import NavigationHeader from "@/components/navigation/NavigationHeader";
import NavigationChildFrame from "@/components/navigation/NavigationChildFrame";
import { DashboardTabParamList } from "@/navigation/DashboardNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "@/components/Spacer";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import SignOutModal from "./SignOutModal";

const AccountSettingScreen: React.FC = ({}) => {
  const [modalVisible, setModalVisible] = useState(false); //This determines if the delete confirmation modal will show up
  const navigation = useProfileNavigation();

  return (
    <SafeAreaView style={style.container}>
      <NavigationHeader title="Account Setting" />
      <Spacer />
      <NavigationChildFrame
        title="Sign Out"
        leftIcon="signOut"
        onPress={() => setModalVisible(true)}
      />
      <NavigationChildFrame
        title="Delete my account"
        leftIcon="delete"
        onPress={() => navigation.navigate("DeleteAccount")}
      />
      {modalVisible && (
        <SignOutModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
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
