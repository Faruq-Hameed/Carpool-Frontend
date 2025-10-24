import React, { useState } from "react";
import { StyleSheet } from "react-native";

import NavigationHeader from "@/components/navigation/NavigationHeader";
import NavigationChildFrame from "@/components/navigation/NavigationChildFrame";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "@/components/others/Spacer";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import SignOutModal from "./SignOutModal";

const AccountSettingScreen: React.FC = ({}) => {
  const [modalVisible, setModalVisible] = useState(false); //This determines if the delete confirmation modal will show up
  const navigation = useProfileNavigation();

  return (
    <SafeAreaView style={style.container}>
      <NavigationHeader title="Account Setting" goBack />
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
