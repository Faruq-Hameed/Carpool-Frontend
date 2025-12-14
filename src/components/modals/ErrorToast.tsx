import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Text from "../texts";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";
import { AppIcon } from "../others/AppIcon";
import { useEffect, useState } from "react";

// export function ErrorToast({
//   title,
//   message,
//   top=20,
// }: {
//   title?: string;
//   message: string | undefined;
//   top?: number;
// }) {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (message) {
//       setIsVisible(true);
//       const timer = setTimeout(() => setIsVisible(false), 700000);
//       return () => clearTimeout(timer); // Clear timeout if component unmounts or message changes
//     }
//   }, [message]);

//   if (!isVisible || !message) return null;

//   return (
//     <View style={[{ ...styles.toast, top }]}>
//       <AppIcon name="warning" size={40} />
//       <View style={{ flex: 1, marginHorizontal: 10 }}>
//         <Text h4 h4Style={styles.title}>
//           {title ?? "Action Failed"}
//         </Text>
//         <Text style={styles.text}>{message}</Text>
//       </View>
//       <TouchableOpacity onPress={() => setIsVisible(false)}>
//         <AppIcon name="x" size={40} />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   toast: {
//     position: "absolute",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     alignContent: "center",
//     width: getResponsiveWidth(0.95), // 80% of screen width
//     // marginTop: 50,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderRadius: 4,
//     borderColor: "#CE0000",
//     backgroundColor: "#FCF6F6",
//     // boxShadow: "0px 4px 6px rgba(244, 11, 11, 0.1)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 4,
//     top: 20,
//     zIndex: 999,
//   },
//   title: {
//     color: "#262626",
//     fontWeight: 600,
//   },
//   text: {
//     color: "#262626",
//     fontWeight: "bold",
//     //  color: "#262626",
//     // fontWeight: "bold",
//     flexShrink: 1,
//     flexWrap: "wrap",
//    flex: 0.2,
//    width: "50%",
//    borderWidth: 1,

//   },
// });



export function ErrorToast({
  title,
  message,
  top = 20,
}: {
  title?: string;
  message: string | undefined;
  top?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 700000); // Changed from 700000 to 7000 (7 seconds)
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isVisible || !message) return null;

  return (
    <View style={[styles.toast, { top }]}>
      <View style={styles.iconContainer}>
        <AppIcon name="warning" size={40} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text h4 h4Style={styles.title}>
          {title ?? "Action Failed"}
        </Text>
        <Text style={styles.text}>{message}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => setIsVisible(false)}
        style={styles.iconContainer}
      >
        <AppIcon name="x" size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-start", // Changed from center to flex-start
    width: getResponsiveWidth(0.95),
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#CE0000",
    backgroundColor: "#FCF6F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 999,
    alignSelf: "center", //move to the middele
    columnGap: 8
  },
  iconContainer: {
    width: 40, // Fixed width for icons
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1, // Takes remaining space
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"
  },
  title: {
    color: "#262626",
    fontWeight: "600",
    marginBottom: 2,
  },
  text: {
    color: "#262626",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: 14
  },

});
