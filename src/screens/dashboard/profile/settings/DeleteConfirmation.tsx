import React, { useState } from "react";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { StyleSheet } from "react-native";

import { PseudoModalScreen } from "../components";
import Modal from "@/components/modals/CustomModal";
import { useAuth } from "@/hooks/useAuth";

/** Delete confirmation  that pops up when user click delete in delete account screen
 * With initial state, the modal will be visible when the component mounts
 * @param visibleState - initial boolean state of the modal without this
 * calling the modal again won't make it visible.
 * @returns - Modal component with content and buttons
 */
const DeleteConfirmationModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const { logout } = useAuth();
  const navigation = useProfileNavigation();
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      children={
        <PseudoModalScreen
          headerText="Deleting Account"
          description="Deleting your account will permanently remove all 
            your profile and account information. This action can not be undone"
          upperBtnTitle="Do not Delete"
          onUpperBtnPress={() => {
            navigation.goBack(); //go back to account setting screen
           onClose();
          }}
          lowerBtnTitle="Yes, delete my account"
          //   handle delete api and logout will be called
          onLowerBtnPress={() => {
            logout();
            onClose(); //Though not compulsory since logout unmount the current navigation stack
          }}
          lowerBtnColour="#CC0000"
        />
      }
    />
  );
};

const styles = StyleSheet.create({});

export default DeleteConfirmationModal;
