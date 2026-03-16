import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Text as RNText,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NavigationHeader from "@/components/navigation/NavigationHeader";
import PassCodeInput from "@/components/forms/PassCodeInput";
import NavButton from "@/components/buttons/GreenButton";
import Spacer from "@/components/others/Spacer";
import Text from "@/components/texts";
import { useChangePasscode } from "@/hooks/useProfile";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { Colors, Spacing, FontSize, Radius } from "@/theme";

const ChangePasscodeScreen: React.FC = () => {
  const navigation = useProfileNavigation();
  const { mutate: changePasscode, isPending } = useChangePasscode();

  const [oldPasscode, setOldPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!oldPasscode || !newPasscode || !confirmPasscode) {
      Alert.alert("Validation", "All fields are required.");
      return;
    }
    if (newPasscode !== confirmPasscode) {
      Alert.alert("Validation", "New passcode and confirmation do not match.");
      return;
    }
    if (newPasscode.length < 4) {
      Alert.alert("Validation", "Passcode must be at least 4 characters.");
      return;
    }
    changePasscode(
      { oldPasscode, newPasscode },
      {
        onSuccess: () => {
          Alert.alert("Success", "Passcode changed successfully.", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ?? "Failed to change passcode.";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader title="Change Passcode" goBack />
      <Spacer />

      <View style={styles.form}>
        <Text style={styles.desc}>
          Enter your current passcode, then set a new one.
        </Text>
        <Spacer />

        <PasscodeField
          label="Current passcode"
          value={oldPasscode}
          onChangeText={setOldPasscode}
          show={showOld}
          onToggle={() => setShowOld((v) => !v)}
        />
        <PasscodeField
          label="New passcode"
          value={newPasscode}
          onChangeText={setNewPasscode}
          show={showNew}
          onToggle={() => setShowNew((v) => !v)}
        />
        <PasscodeField
          label="Confirm new passcode"
          value={confirmPasscode}
          onChangeText={setConfirmPasscode}
          show={showConfirm}
          onToggle={() => setShowConfirm((v) => !v)}
        />

        <Spacer />
        {isPending ? (
          <View style={styles.loadingBtn}>
            <ActivityIndicator color="#fff" />
            <RNText style={styles.loadingText}>Saving…</RNText>
          </View>
        ) : (
          <NavButton title="Save Passcode" onPress={handleSubmit} />
        )}
      </View>
    </SafeAreaView>
  );
};

/** Inline passcode field with show/hide toggle */
const PasscodeField: React.FC<{
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  show: boolean;
  onToggle: () => void;
}> = ({ label, value, onChangeText, show, onToggle }) => (
  <View style={styles.fieldWrapper}>
    <PassCodeInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      hidePassCode={!show}
    />
    <TouchableOpacity style={styles.eyeBtn} onPress={onToggle}>
      <Ionicons
        name={show ? "eye-off-outline" : "eye-outline"}
        size={20}
        color={Colors.textSecondary}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Spacing.base,
  },
  form: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  desc: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  fieldWrapper: {
    position: "relative",
    marginBottom: Spacing.sm,
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    bottom: 28,
  },
  loadingBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 14,
  },
  loadingText: {
    color: "#fff",
    fontSize: FontSize.base,
    fontWeight: "600",
  },
});

export default ChangePasscodeScreen;
