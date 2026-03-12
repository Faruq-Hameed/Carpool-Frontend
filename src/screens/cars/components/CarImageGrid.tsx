import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CarImage } from "@/apis/cars/types";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const GRID_PADDING = Spacing.base * 2;
const CELL_GAP = Spacing.sm;
const CELL_SIZE = (SCREEN_WIDTH - GRID_PADDING - CELL_GAP * 2) / 3;

interface CarImageGridProps {
  images: CarImage[];
  /** Called when the user taps "Add Photos". Provide this once expo-image-picker is installed. */
  onAddPhotos?: () => void;
}

/**
 * Displays a 3-column grid of car photos.
 * The last cell is always an "Add" button — tap triggers onAddPhotos.
 *
 * NOTE: Photo upload requires expo-image-picker.
 * Install with:  npx expo install expo-image-picker
 * Then wire the result to useAddCarImages().
 */
export const CarImageGrid: React.FC<CarImageGridProps> = ({
  images,
  onAddPhotos,
}) => {
  const handleAddPress = () => {
    if (onAddPhotos) {
      onAddPhotos();
    } else {
      Alert.alert(
        "Add Photos",
        "To enable photo uploads run:\n\nnpx expo install expo-image-picker\n\nthen implement the onAddPhotos handler."
      );
    }
  };

  return (
    <View style={styles.grid}>
      {images.map((img) => (
        <View key={img.id} style={styles.cell}>
          <Image source={{ uri: img.url }} style={styles.image} />
          {img.type ? (
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>{img.type}</Text>
            </View>
          ) : null}
        </View>
      ))}

      {/* Add Photos cell */}
      <TouchableOpacity
        style={styles.addCell}
        onPress={handleAddPress}
        activeOpacity={0.7}
      >
        <Ionicons name="camera-outline" size={24} color={Colors.textSecondary} />
        <Text style={styles.addText}>Add{"\n"}Photos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CELL_GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: Radius.sm,
    overflow: "hidden",
    backgroundColor: Colors.surface,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  typeTag: {
    position: "absolute",
    bottom: 4,
    left: 4,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  typeText: {
    fontSize: FontSize.xs,
    color: Colors.white,
    textTransform: "capitalize",
  },
  addCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: Colors.surface,
  },
  addText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 14,
  },
});
