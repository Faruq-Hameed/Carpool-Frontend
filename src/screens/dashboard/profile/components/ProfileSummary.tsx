import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import Text from "@/components/texts";
import { AppIcon } from "@/components/others/AppIcon";
import { useAuth } from "@/hooks/useAuth";
import { useMyWallet } from "@/hooks/useWallet";
import { getGreeting } from "@/utils";
import { useUpdateProfilePicture } from "@/hooks/useProfile";
import { Colors, Radius } from "@/theme";

const ProfileSummary: React.FC<{}> = () => {
  const { currentUser, saveUser } = useAuth();
  const { data: wallet } = useMyWallet();

  const { mutate: uploadPicture, isPending: uploading } = useUpdateProfilePicture();

  const handleAvatarPress = () => {
    Alert.alert("Profile Picture", "Choose an option", [
      {
        text: "Camera",
        onPress: pickFromCamera,
      },
      {
        text: "Gallery",
        onPress: pickFromGallery,
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const uploadImage = (uri: string) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);
    uploadPicture(formData, {
      onSuccess: (updatedUser) => {
        if (updatedUser) saveUser(updatedUser as any);
      },
      onError: () => Alert.alert("Error", "Failed to update profile picture."),
    });
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      uploadImage(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Gallery access is needed.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      uploadImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarWrapper} activeOpacity={0.8}>
        {uploading ? (
          <View style={styles.avatar}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : currentUser?.profilePicture ? (
          <Image source={{ uri: currentUser.profilePicture }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar}>
            <Text>{currentUser?.firstName?.charAt(0).toLocaleUpperCase() ?? ""}</Text>
          </View>
        )}
        <View style={styles.cameraBadge}>
          <Ionicons name="camera" size={12} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Name */}
      <View>
        <Text style={styles.name} h4>
          {`${currentUser?.lastName ?? ""} ${currentUser?.firstName ?? ""}`}
        </Text>
        <Text style={styles.period}>{getGreeting()}</Text>
      </View>

      {/* Wallet + rating */}
      <View style={styles.rightContainer}>
        <View style={styles.walletContainer}>
          <AppIcon name="whiteWallet" />
          <Text style={styles.balance} h4 h4Style={styles.rating}>
            {" "}
            N{Number(wallet?.balance ?? 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <AppIcon name="star" />
          <Text style={styles.rating} h4 h4Style={styles.rating}>
            4/5
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 5,
    paddingBottom: 15,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    borderWidth: 0.4,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 80,
    backgroundColor: "#F7F7F7",
    borderColor: "#595959",
    overflow: "hidden",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  period: {
    fontSize: 14,
  },
  rightContainer: {
    borderColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
  walletContainer: {
    backgroundColor: "#3D663F",
    paddingHorizontal: 5,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    color: "white",
  },
  balance: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ProfileSummary;
