import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "@components/Text";
import { AppIcon } from "@/components/AppIcon";

const ProfileSummary: React.FC<{}> = () => {
  return (
    <View>
      <View>
        {/* The user profile pic should be displayed here. or first char of name */}
        <Text>F</Text>
      </View>
      {/* Name container */}
      <View>
        <Text>Hameed Faruq</Text>
        <Text>Good afternoon</Text> /*Actual period will be used e.g
        morning,afternoon*/
      </View>
      {/* wallet container */}
      <View>
        <AppIcon name="wallet" />
        <Text> N1, 000.00</Text> /*Actual amount will be used*/
      </View>
    </View>
  );
};
