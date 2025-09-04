import React from "react";
import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DashboardTabParamList } from "../../navigation/DashboardNavigator";

type Props = BottomTabScreenProps<DashboardTabParamList, "Offer">;

const OfferRideScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Offer Ride Screen</Text>
    </View>
  );
};

export default OfferRideScreen;
