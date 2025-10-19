import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CustomModal from "./CustomModal";

interface PleaseWaitModalProps {
  visible: boolean;
  message?: string;
  onClose?: () => void;
}

/**
 * @component PleaseWaitModal
 * 
 * @description
 * A lightweight and reusable modal that displays a loading spinner
 * with a short message such as “Please wait a bit.”.
 * 
 * It is built on top of the `CustomModal` component and can be used
 * whenever an async process (like an API request or data upload)
 * requires the user to wait momentarily.
 * 
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import { Button } from "react-native";
 * import PleaseWaitModal from "@/components/modals/PleaseWaitModal";
 * 
 * export default function ExampleScreen() {
 *   const [loading, setLoading] = useState(false);
 * 
 *   const simulateRequest = async () => {
 *     setLoading(true);
 *     await new Promise((resolve) => setTimeout(resolve, 3000)); // fake delay
 *     setLoading(false);
 *   };
 * 
 *   return (
 *     <>
 *       <Button title="Start loading" onPress={simulateRequest} />
 *       <PleaseWaitModal visible={loading} />
 *     </>
 *   );
 * }
 * ```
 * 
 * @props
 * | Name     | Type      | Default              | Description |
 * |-----------|-----------|----------------------|--------------|
 * | `visible` | `boolean` | —                    | Controls modal visibility. |
 * | `message` | `string`  | `"Please wait a bit."` | Optional message displayed under the spinner. |
 * | `onClose` | `() => void` | `() => {}`         | Optional callback triggered when modal is closed (via Android back button). |
 * 
 * @dependencies
 * - `react-native`
 * - `CustomModal` (local component)
 * 
 * @usageNotes
 * - The background is semi-transparent gray (`#B2B2B2F2` from `CustomModal`).
 * - Ideal for showing brief waiting states (API loading, navigation, etc).
 */


const PleaseWaitModal: React.FC<PleaseWaitModalProps> = ({
  visible,
  message = "Please wait a bit.",
  onClose = () => {},
}) => {
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0B6623" />
        <Text style={styles.text}>{message}</Text>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#000",
  },
});

export default PleaseWaitModal;
