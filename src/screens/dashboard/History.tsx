import React from "react";
// import Text from "../../components/Text";
import { StackScreenProps } from "@react-navigation/stack";
import { DashboardTabParamList } from "../../navigation/MainNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text } from "@rneui/themed";

type Props = BottomTabScreenProps<DashboardTabParamList, "History">;

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  return <Text>Welcome to the History!</Text>;
};

export default HistoryScreen;
