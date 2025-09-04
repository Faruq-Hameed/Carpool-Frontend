import React from "react";
// import Text from "../../components/Text";
import { StackScreenProps } from "@react-navigation/stack";
import { DashboardTabParamList } from "../../navigation/DashboardNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text } from "@rneui/themed";

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
type Props = BottomTabScreenProps<DashboardTabParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return <Text>Welcome to the Profile!</Text>;
};

export default ProfileScreen;
