import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { ApiStatus } from "@/utils/constants/ApiStatus";
import UserKycStatus from "@/models/UserKycStatus";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

type ScreenState = "guide" | "preview";

const FaceCaptureScreen: React.FC = () => {
  const navigation = useVerificationNavigation();
  const { setUserKycStatus, UserKycStatus } = useAuth();

  const [screenState, setScreenState] = useState<ScreenState>("guide");
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  // Show "under review" if already pending from a previous session
  const [submitted, setSubmitted] = useState(
    UserKycStatus.selfieStatus === ApiStatus.PENDING,
  );

  const { initiateApiCall, isLoading, error } = useMutationHandler<UserKycStatus>(
    "faceVeriication",
    (data) => {
      if (data) {
        setUserKycStatus({
          ninStatus: (data as any).ninStatus ?? ApiStatus.NOT_VERIFIED,
          dobStatus: (data as any).dobStatus ?? ApiStatus.NOT_VERIFIED,
          selfieStatus: (data as any).selfieStatus ?? ApiStatus.PENDING,
        });
      }
      setSubmitted(true);
    },
  );

  const handleCapture = async () => {
    setIsCapturing(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Camera Permission Required",
          "Please allow camera access in your device settings to take a selfie.",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedUri(result.assets[0].uri);
        setScreenState("preview");
      }
    } catch {
      Alert.alert("Error", "Could not open camera. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleRetake = () => {
    setCapturedUri(null);
    setScreenState("guide");
  };

  const handleSubmit = () => {
    if (!capturedUri) return;
    const formData = new FormData();
    formData.append("selfie", {
      uri: capturedUri,
      name: "selfie.jpg",
      type: "image/jpeg",
    } as any);
    initiateApiCall(formData);
  };

  // ── Submitted state ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredContent}>
          <View style={styles.successIcon}>
            <Ionicons name="time-outline" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.successTitle}>Selfie Submitted!</Text>
          <Text style={styles.successBody}>
            Your selfie is under review. We'll notify you once it's been
            verified — usually within 24 hours.
          </Text>
          <NavButton title="Done" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  // ── Preview state ──────────────────────────────────────────────────────
  if (screenState === "preview" && capturedUri) {
    return (
      <SafeAreaView style={styles.container}>
        <UpperTextsFrame header="Face Capture" />

        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Use this photo?</Text>
          <Text style={styles.previewSub}>
            Make sure your face is clear, well-lit, and centred.
          </Text>

          <View style={styles.imageWrapper}>
            <Image source={{ uri: capturedUri }} style={styles.previewImage} />
          </View>

          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>

        <View style={styles.previewActions}>
          <TouchableOpacity
            style={styles.retakeBtn}
            onPress={handleRetake}
            disabled={isLoading}
          >
            <Ionicons name="camera-reverse-outline" size={18} color={Colors.primary} />
            <Text style={styles.retakeBtnText}>Retake</Text>
          </TouchableOpacity>

          <View style={styles.submitBtnWrap}>
            {isLoading ? (
              <View style={styles.loadingBtn}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loadingBtnText}>Submitting…</Text>
              </View>
            ) : (
              <NavButton title="Submit Selfie" onPress={handleSubmit} />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ── Guide state (default) ──────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <UpperTextsFrame header="Face Capture" />

      <View style={styles.guideContent}>
        <View style={styles.ovalFrame}>
          <Ionicons name="person-circle-outline" size={120} color={Colors.primary} />
        </View>

        <Text style={styles.guideTitle}>Take a selfie</Text>
        <Text style={styles.guideBody}>
          Your selfie will be reviewed by our team to verify your identity.
        </Text>

        <View style={styles.tipsBox}>
          {[
            "Face the camera directly with a neutral expression",
            "Ensure your face is fully visible — no sunglasses or hats",
            "Find a well-lit area with no harsh shadows",
            "Hold your phone at eye level",
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText}>
            Photo captured will also be used as your profile picture.
          </Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        {isCapturing ? (
          <View style={styles.loadingBtn}>
            <ActivityIndicator color="#fff" size="small" />
            <Text style={styles.loadingBtnText}>Opening camera…</Text>
          </View>
        ) : (
          <NavButton title="Open Camera" onPress={handleCapture} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Spacing.base,
  },
  centeredContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    gap: Spacing.base,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  successTitle: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },
  successBody: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing.base,
  },
  guideContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: Spacing.base,
    gap: Spacing.md,
  },
  ovalFrame: {
    width: 160,
    height: 200,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: Colors.primary,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  guideTitle: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
  },
  guideBody: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  tipsBox: {
    width: "100%",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    padding: Spacing.md,
    width: "100%",
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  btnContainer: {
    paddingBottom: Spacing.sm,
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },
  previewLabel: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
  },
  previewSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  imageWrapper: {
    width: 220,
    height: 280,
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: "#FEF2F2",
    borderRadius: Radius.sm,
    padding: Spacing.md,
    width: "100%",
  },
  errorText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: "#DC2626",
  },
  previewActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  retakeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: Spacing.base,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  retakeBtnText: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.primary,
  },
  submitBtnWrap: {
    flex: 1,
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
  loadingBtnText: {
    color: "#fff",
    fontSize: FontSize.base,
    fontWeight: "600",
  },
});

export default FaceCaptureScreen;
