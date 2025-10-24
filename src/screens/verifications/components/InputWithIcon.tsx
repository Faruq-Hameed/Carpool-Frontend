import AppSvgIcon from "@/components/others/AppSvgIcon";
import FormInput from "@/components/forms/formInput";
import CustomModal from "@/components/modals/CustomModal";
import PasscodeModal from "@/components/modals/PasscodeModal";
import PseudoModalScreen from "@/components/modals/PseudoModalScreen";
import { IconName } from "@/helpers/icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  label: string | React.ReactNode;
  title?: string //this will be passed if label is a ReactNode
  value: string;
  rightIconName?: IconName;
  onPasscodeContinue: (passcode: string) => void; //callback that receive passcode value passed b the child
}
/**Input component with right icon */
const InputWithIcon: React.FC<Props> = ({
  label,
  title,
  value,
  onPasscodeContinue,
}) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [passcodeModalVisible, setPasscodeModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setConfirmModalVisible(true);
      }}
    >
      <PasscodeModal
        visible={passcodeModalVisible}
        onClose={() => setPasscodeModalVisible(false)}
        onContinue={(passcode) =>{
          onPasscodeContinue(passcode) //send it up
        }}
      />
      <CustomModal
        onClose={() => setConfirmModalVisible(false)}
        visible={confirmModalVisible}
        children={
          <PseudoModalScreen
            headerText={`Change ${title || label}`}
            description={`Do you want to change your ${title || label}?`}
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
        onChangeText={()=>{}}
        rightIconName="pencilSimpleLine"
        disabled={true}
      />
    </TouchableOpacity>
  );
};

export default InputWithIcon;
