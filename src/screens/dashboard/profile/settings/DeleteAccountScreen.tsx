import FormInput from "@/components/forms/formInput";
import PassCodeUtils from "@/components/forms/passcodeUtils";
import NavigationHeader from "@/components/navigations/NavigationHeader";
import SmallSpacer from "@/components/SmallSpacer";
import Spacer from "@/components/Spacer";
import Text from "@/components/Text";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import LowerActionButtons from "../components/LowerActionButtons";
import DeleteConfirmationModal from "./DeleteConfirmation";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";

const DeleteAccountScreen: React.FC = () => {
  const { logout } = useAuth();
  const navigation = useProfileNavigation();

  const [modalVisible, setModalVisible] = useState(false); //This determines if the delete confirmation modal will show up
  const [reason, setReason] = useState<string>("");
  const [passCode, setPassCode] = useState<string>("");
  const [hidePasscode, setHidePasscode] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader title="Delete my account" />
      <View style={styles.formContainer}>
        <Text> We are unhappy to see you leave</Text>
        <Spacer />
        <FormInput
          label="Reason for deletion"
          value={reason}
          onChangeText={setReason}
        />
        <PassCodeUtils
          label="Account passcode"
          setPassCode={setPassCode}
          setHidePasscode={setHidePasscode} //show password state
          hideForgetPassword={true}
        />
        <Spacer />
        <Spacer />
        <LowerActionButtons
          upperBtnTitle="Do not Delete"
          onUpperBtnPress={() => {
            navigation.goBack() //go back to account setting screen
            setModalVisible(false);
          }}
          lowerBtnColour="#CC0000"
          lowerBtnTitle="Yes, delete my account"
          onLowerBtnPress={() => {
            setModalVisible(true);
          }}
          width={0.9}
        />
      </View>
      {modalVisible && <DeleteConfirmationModal visibleState={true} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    alignItems: "center",
    flex: 1,
  },
});

export default DeleteAccountScreen;
