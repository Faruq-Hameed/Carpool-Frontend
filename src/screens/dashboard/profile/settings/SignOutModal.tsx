import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { SettingModalContent } from "../components";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";

/** Sign out modal  that pops up when user click Sign out in Account setting
 * With initial state, the modal will be visible when the component mounts
 * @param visibleState - initial boolean state of the modal without this
 * calling the modal again won't make it visible. Though it is always called with true
 * @returns - Modal component with content and buttons
 */
const SignOutModal: React.FC<{ visibleState: boolean }> = (visibleState) => {
  const [modalVisible, setModalVisible] = useState(visibleState.visibleState); //always expected to be true
  const { logout } = useAuth();

  return (
    modalVisible && (
      <Modal
        // onModalClose={() => modalVisible}
        content={
          <SettingModalContent
            headerText="Sign out"
            description="Are you sure you want to sign out of your account?"
            upperBtnTitle="No, take me back"
            onUpperBtnPress={() => {
              setModalVisible(false);
            }}
            // onSignOut; //this will handle sign out
            lowerBtnTitle="Yes, sign me out"
            onLowerBtnPress={() => {
              logout();
              setModalVisible(false);
            }}
            lowerBtnColour="#CC0000"
          />
        }
      />
    )
  );
};

const styles = StyleSheet.create({});

export default SignOutModal;
