import { View, StyleSheet } from "react-native";
import Text from "../texts";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";
import { AppIcon } from "../AppIcon";

export function ErrorToast({
  title,
  message,
}: {
  title: string;
  message: string | undefined;
}) {
  if (!message) return null;

  return (
    <View style={styles.toast}>
      <AppIcon name="warning" size={40}/>
      <View>
        <Text h4 h4Style={styles.title}>
          {title}
        </Text>
        <Text style={styles.text}>{message}</Text>
      </View>
      <AppIcon name="x" size={40}/>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: getResponsiveWidth(0.95), // 80% of screen width
    marginTop: 50,
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#CE0000",
    backgroundColor: "#FCF6F6",
    boxShadow: "0px 4px 6px rgba(244, 11, 11, 0.1)",
    zIndex: 999,
  },
  title: {
    color: "#262626",
    fontWeight: 600,
  },
  text: {
    color: "#262626",
    fontWeight: "bold",
  },
});
