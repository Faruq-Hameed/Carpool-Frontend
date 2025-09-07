import React from "react";
import { StyleSheet } from "react-native";

import { PseudoModalScreen } from "../dashboard/profile/components";
import Modal from "@/components/modals/CustomModal";
import { useAuth } from "@/hooks/useAuth";

/** SignOutModal
 * A modal that confirms if the user wants to sign out
 * @param param0 {visible, onClose}
 * @returns A modal that confirms if the user wants to sign out
 */
const SignOutModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const { logout } = useAuth();

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      children={
        <PseudoModalScreen
          headerText="Sign out"
          description="Are you sure you want to sign out of your account?"
          upperBtnTitle="No, take me back"
          onUpperBtnPress={onClose} //just close the modal
          lowerBtnTitle="Yes, sign me out"
          onLowerBtnPress={() => {
            // onSignOut; //this will handle sign out
            logout();
            onClose();
          }}
          lowerBtnColour="#CC0000"
        />
      }
    />
  );
};

const styles = StyleSheet.create({});

export default SignOutModal;
