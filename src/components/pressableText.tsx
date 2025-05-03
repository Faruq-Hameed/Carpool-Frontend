import React, { useRef } from "react";
import { Pressable, Text, Animated } from "react-native";

const PressableText = ({
  text,
  onPress,
  bold = true,
  color = "#126415",

}: {
  text: string;
  onPress: () => void;
  bold?: boolean;
  color: string;

}) => {
  const animatedFontSize = useRef(new Animated.Value(16)).current;

  const handlePressIn = () => {
    Animated.timing(animatedFontSize, {
      toValue: 18,
      duration: 150,
      useNativeDriver: false, // fontSize doesn't support native driver
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedFontSize, {
      toValue: 16,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Animated.Text
        style={{
          fontSize: animatedFontSize,
          textDecorationLine: "underline",
          borderBottomColor: "blue",
          color: "blue",
          fontWeight: bold ? "bold" : "normal",
        }}
      >
        {text}
      </Animated.Text>
    </Pressable>
  );
};

export default PressableText