import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
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
      <TouchableOpacity onPress={handleSignOut} style={{ marginTop: 16, padding: 12, backgroundColor: "#126415", borderRadius: 4 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryScreen;
