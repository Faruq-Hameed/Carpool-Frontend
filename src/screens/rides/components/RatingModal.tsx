import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Radius, FontSize } from "@/theme";
import { useCreateReview } from "@/hooks/useReviews";

interface Props {
  visible: boolean;
  rideId: string;
  driverName: string;
  onDismiss: () => void;
}

const RatingModal: React.FC<Props> = ({
  visible,
  rideId,
  driverName,
  onDismiss,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const createReview = useCreateReview(rideId);

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Select rating", "Please tap a star to rate the driver.");
      return;
    }
    createReview.mutate(
      { rating, comment: comment.trim() || undefined },
      {
        onSuccess: () => {
          Alert.alert("Thank you!", "Your review has been submitted.");
          onDismiss();
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ?? "Could not submit review.";
          Alert.alert("Error", msg);
        },
      }
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Rate your ride</Text>
          <Text style={styles.subtitle}>
            How was your experience with{" "}
            <Text style={styles.driverName}>{driverName}</Text>?
          </Text>

          {/* Star picker */}
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={36}
                  color={star <= rating ? "#F59E0B" : "#D1D5DB"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {rating > 0 && (
            <Text style={styles.ratingLabel}>
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </Text>
          )}

          {/* Optional comment */}
          <TextInput
            style={styles.commentInput}
            placeholder="Leave a comment (optional)"
            placeholderTextColor="#9CA3AF"
            value={comment}
            onChangeText={setComment}
            multiline
            maxLength={500}
            numberOfLines={3}
          />

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.skipBtn}
              onPress={onDismiss}
              disabled={createReview.isPending}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitBtn,
                rating === 0 && styles.submitBtnDisabled,
              ]}
              onPress={handleSubmit}
              disabled={rating === 0 || createReview.isPending}
            >
              {createReview.isPending ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.base,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: "center",
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
    textAlign: "center",
  },
  driverName: {
    fontWeight: "600",
    color: Colors.primary,
  },
  stars: {
    flexDirection: "row",
    gap: Spacing.md,
    marginVertical: Spacing.sm,
  },
  ratingLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: "#F59E0B",
  },
  commentInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    padding: Spacing.md,
    fontSize: FontSize.base,
    color: Colors.text,
    textAlignVertical: "top",
    minHeight: 72,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.md,
    width: "100%",
  },
  skipBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  skipText: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  submitBtn: {
    flex: 2,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  submitBtnDisabled: {
    opacity: 0.4,
  },
  submitText: {
    fontSize: FontSize.base,
    color: "#fff",
    fontWeight: "700",
  },
});

export default RatingModal;
