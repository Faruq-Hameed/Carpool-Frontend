import React from "react";
import { StyleSheet, Alert } from "react-native";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";

import { PseudoModalScreen } from "../dashboard/profile/components";
import Modal from "@/components/modals/CustomModal";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteAccount } from "@/hooks/useProfile";

/** Delete confirmation modal. Calls DELETE /users/me then logs the user out. */
const DeleteConfirmationModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const { logout } = useAuth();
  const navigation = useProfileNavigation();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleDelete = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        onClose();
        logout();
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message ?? "Failed to delete account. Please try again.";
        Alert.alert("Error", msg);
      },
    });
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      children={
        <PseudoModalScreen
          headerText="Deleting Account"
          description="Deleting your account will permanently remove all your profile and account information. This action cannot be undone."
          upperBtnTitle="Do not Delete"
          onUpperBtnPress={() => {
            navigation.goBack();
            onClose();
          }}
          lowerBtnTitle={isPending ? "Deleting…" : "Yes, delete my account"}
          onLowerBtnPress={handleDelete}
          lowerBtnColour="#CC0000"
        />
      }
    />
  );
};

const styles = StyleSheet.create({});

export default DeleteConfirmationModal;
