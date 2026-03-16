import React from "react";
import { Alert } from "react-native";
import { StyleSheet } from "react-native";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";

import { PseudoModalScreen } from "../dashboard/profile/components";
import Modal from "@/components/modals/CustomModal";
import { useAuth } from "@/hooks/useAuth";
import { useRequestAccountDeletion } from "@/hooks/useProfile";

/**
 * Confirms account deletion request.
 * Calls POST /users/me/deletion-request → account immediately locked (cannot login).
 * An admin must approve or reject the request.
 */
const DeleteConfirmationModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const { logout } = useAuth();
  const navigation = useProfileNavigation();
  const { mutate: requestDeletion, isPending } = useRequestAccountDeletion();

  const handleDelete = () => {
    requestDeletion(undefined, {
      onSuccess: () => {
        onClose();
        // Account is now locked — sign the user out immediately
        logout();
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message ?? "Failed to submit deletion request. Please try again.";
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
          headerText="Delete Account"
          description={
            "Once you submit this request your account will be locked immediately — you will be signed out and cannot log back in.\n\nAn admin will review and permanently delete your account. This cannot be undone."
          }
          upperBtnTitle="Cancel"
          onUpperBtnPress={() => {
            navigation.goBack();
            onClose();
          }}
          lowerBtnTitle={isPending ? "Submitting…" : "Submit deletion request"}
          onLowerBtnPress={handleDelete}
          lowerBtnColour="#CC0000"
        />
      }
    />
  );
};

const styles = StyleSheet.create({});

export default DeleteConfirmationModal;
