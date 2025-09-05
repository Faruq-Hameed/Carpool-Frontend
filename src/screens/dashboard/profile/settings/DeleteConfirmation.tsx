import React, { useCallback, useState } from "react";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { StyleSheet } from "react-native";

import { ModalContent } from "../components";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";

const DeleteConfirmationModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const { logout } = useAuth();
  const navigation = useProfileNavigation();
  return (
    modalVisible && (
      <Modal
        onModalClose={() => modalVisible}
        content={
          <ModalContent
            headerText="Deleting Account"
            description="Deleting your account will permanently remove all 
            your profile and account information. This action can not be undone"
            upperBtnTitle="Do not Delete"
            onUpperBtnPress={() => {
              setModalVisible(false);
            }}
            lowerBtnTitle="Yes, delete my account"
            //   handle delete api and logout will be called
            onLowerBtnPress={() => {
              logout();
              //   setModalVisible(false);
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
