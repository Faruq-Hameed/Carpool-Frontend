import React, { useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from "react-native";

interface UnderlineButtonProps {
  //reusable button component with underline animation
  /** Reusable button component with underline animation */
  title: string;
  onPress: () => void;
  color?: string;
  fontSize?: number;
  bold?: boolean;
}

const UnderlineButton: React.FC<UnderlineButtonProps> = ({
  title,
  onPress,
  color = "#126415",
  fontSize = 16,
  bold = true,
}) => {
  const underlineWidth = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(underlineWidth, {
      toValue: 1, //animate to full width
      duration: 150, //duration of the animation in milliseconds
      useNativeDriver: false, //
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(underlineWidth, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const underlineStyle = {
    width: underlineWidth.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    }),
    height: 2,
    backgroundColor: color,
    marginTop: 2,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
      style={styles.wrapper}
    >
      <Text
        style={{
          textDecorationLine: "underline",
          textDecorationStyle: "solid",
          color,
          fontSize,
          fontWeight: bold ? "600" : "400",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Animated.View style={underlineStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: 12,
  },
});

export default UnderlineButton;
