import React, {  useState } from "react";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { StyleSheet } from "react-native";

import { SettingModalContent } from "../components";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";

/** Delete confirmation  that pops up when user click delete in delete account screen
 * With initial state, the modal will be visible when the component mounts
 * @param visibleState - initial boolean state of the modal without this 
 * calling the modal again won't make it visible. Though it is always called with true
 * @returns - Modal component with content and buttons
 */
const DeleteConfirmationModal: React.FC<{ visibleState: boolean }> = (
  visibleState
) => {
  const [modalVisible, setModalVisible] = useState(visibleState.visibleState);
  const { logout } = useAuth();
  const navigation = useProfileNavigation();
  return (
    modalVisible && (
      <Modal
        content={
          <SettingModalContent
            headerText="Deleting Account"
            description="Deleting your account will permanently remove all 
            your profile and account information. This action can not be undone"
            upperBtnTitle="Do not Delete"
            onUpperBtnPress={() => {
            navigation.goBack() //go back to account setting screen
              setModalVisible(false);
            }}
            lowerBtnTitle="Yes, delete my account"
            //   handle delete api and logout will be called
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

export default DeleteConfirmationModal;
