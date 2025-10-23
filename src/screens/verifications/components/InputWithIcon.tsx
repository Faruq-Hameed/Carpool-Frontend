import AppSvgIcon from "@/components/AppSvgIcon";
import FormInput from "@/components/forms/formInput";
import CustomModal from "@/components/modals/CustomModal";
import PasscodeModal from "@/components/modals/PasscodeModal";
import PseudoModalScreen from "@/components/modals/PseudoModalScreen";
import { IconName } from "@/helpers/icons";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  rightIconName?: IconName;
  onPress: () => void;
    onPasscodeContinue: () => void; //I WILL USE THIS TO BRING IN PASSCODE MODAL
}
/**Input component with right icon */
const InputWithIcon: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  onPress, //ON PRESS SHOULD ACTIVATE CONFIRMATION MODAL which on continue of it bring passcode modal to live
onPasscodeContinue,
}) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [passcodeModalVisible, setPasscodeModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setConfirmModalVisible(true);
        onPress();
      }}
    >
      <PasscodeModal
        visible={passcodeModalVisible}
        onClose={() => {
          setPasscodeModalVisible(false);
          onPasscodeContinue()
        }}
      />
      <CustomModal
        onClose={() => setConfirmModalVisible(false)}
        visible={confirmModalVisible}
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
      <FormInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        rightIconName="pencilSimpleLine"
        disabled={true}
      />
    </TouchableOpacity>
  );
};

export default InputWithIcon;
