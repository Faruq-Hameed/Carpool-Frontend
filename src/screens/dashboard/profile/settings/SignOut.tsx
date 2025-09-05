import React, { useCallback, useState } from "react";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { StyleSheet } from "react-native";

import { ModalContent } from "../components";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";

const SignOutScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const { logout } = useAuth();
  const navigation = useProfileNavigation();
  return (
    modalVisible && (
      <Modal
        onModalClose={() => modalVisible}
        content={
          <ModalContent
            headerText="Sign out"
            description="Are you sure you want to sign out of your account?"
            upperBtnTitle="No, take me back"
            lowerBtnTitle="Yes, sign me out"
            onUpperBtnPress={() => {
              setModalVisible(false);
            }}
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

export default SignOutScreen;
