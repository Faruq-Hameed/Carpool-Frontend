import React from "react";
import { View, Text } from "react-native";
import { removeUserToken } from "../../utils/asyncStorage";
import { Button } from "@rneui/themed";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  navigation: any; // or the proper type if you’re using React Navigation types
};

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const {handlePartialLogout} = useAuth()
  const handleSignOut = async () => {
    await handlePartialLogout();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Welcome to the History!
      </Text>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </View>
  );
};

export default HistoryScreen;
