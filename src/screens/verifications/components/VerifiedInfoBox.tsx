import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ContactInfoModal from "./ContactInfoModal";
import Text from "@/components/texts";
import { AppIcon } from "@/components/others/AppIcon";
import VerifiedLabel from "@/components/others/LabelWithIcon";
import CustomModal from "@/components/modals/CustomModal";
import PseudoModalScreen from "@/components/modals/PseudoModalScreen";
import PasscodeModal from "@/components/modals/PasscodeModal";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";

interface Props {
  /**e.g phone number */
  label: "phone" | "email";
  /**e.g faruq@mail.com*/
  details: string;
}
/**Component with verified icon  */
const VerifiedInfoBox: React.FC<Props> = ({ label, details }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [passcodeModalVisible, setPasscodeModalVisible] = useState(false);

  const navigation = useVerificationNavigation();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.label}>
          <VerifiedLabel label={label === "phone" ? "Phone number" : "Email"} />
        </View>
        <View style={styles.box}>
          <Text>{details}</Text>
          <AppIcon
            name="pencilSimpleLine"
            onPress={() => setConfirmModalVisible(true)}
          />
        </View>
      </View>

      <CustomModal
        onClose={() => setConfirmModalVisible(false)}
        visible={confirmModalVisible}
        withCancelIcon
        children={
          <PseudoModalScreen
            headerText={`Change ${label}`}
            description={`Do you want to change your ${label}?`}
            upperBtnTitle="Yes, I want to."
            onUpperBtnPress={() => {
              setConfirmModalVisible(false);

              setPasscodeModalVisible(true);
            }}
            lowerBtnTitle="Maybe later"
            onLowerBtnPress={() => {
              setConfirmModalVisible(false);
              setPasscodeModalVisible(false);
            }}
          />
        }
      />
      <PasscodeModal
        visible={passcodeModalVisible}
        onClose={() => setPasscodeModalVisible(false)}
        onContinue={(passcode) => {
          navigation.navigate("ChangeContactInfo", {
            //navigate to screen to change the contact info
            type: label,
            passcode,
          });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: getResponsiveWidth(0.9),
    backgroundColor: "#ecefecff", // I ADDED THIS MYSELF
    justifyContent: "center",
    margin: "auto", //used to align it correctly
    marginTop: 20,

  },
  label: {
    position: "absolute",
    top: -25,
    fontSize: 15,
  },
  box: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#404040",
    borderRadius: 5,
  },
});

export default VerifiedInfoBox;
