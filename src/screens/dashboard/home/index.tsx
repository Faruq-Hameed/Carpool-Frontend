import React, { useEffect, useState } from "react";
import { View, Text as RNText, StyleSheet } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DashboardTabParamList } from "../../../navigation/DashboardNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSummary from "../profile/components/ProfileSummary";
import { PseudoModalScreen } from "../profile/components";
import CustomModal from "@/components/modals/CustomModal";
import VerificationNavigator from "@/navigation/VerificationNavigator";
import {
  useProfileNavigation,
  useRootNavigation,
} from "@/hooks/useTypedNavigation";
import { useAuth } from "@/hooks/useAuth";
import VerificationBox from "./components/VerificationBox";

// Use BottomTabScreenProps instead of StackScreenProps for tab navigation
type Props = BottomTabScreenProps<DashboardTabParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const rootNavigation = useRootNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [hasModalShown, setHasShown] = useState(false); // track if modal was shown once
  const {
    currentUser: { isVerified },
  } = useAuth();
  useEffect(() => {
    if (!hasModalShown) {
      const timer = setTimeout(() => {
        setModalVisible(true);
        setHasShown(true); // mark as shown so it never triggers again
      }, 5000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [hasModalShown]);
  return (
    <SafeAreaView style={styles.container}>
      <ProfileSummary />
      {!isVerified && <VerificationBox />}
      {modalVisible && !isVerified && (
        <CustomModal
          onClose={() => setModalVisible(false)}
          visible={modalVisible}
          children={
            <PseudoModalScreen
              headerText="Welcome, Faruq" //This should come from state i.e current user.firstname
              description="For everyone’s safety, only verified users can join or offer rides on Share."
              upperBtnTitle="OK, Let’s do it now"
              onUpperBtnPress={() => {
                //   navigation.navigate("Profile", {
                //     screen: "AccountVerification", //go to verification //NEED O LEARN NESTED ROUTE
                //   }
                // );

                // profileNavigation.navigate("AccountVerification"); //go to verification //NEED O LEARN NESTED ROUTE
                rootNavigation.navigate("AccountVerification");
                setModalVisible(false);
              }}
              lowerBtnTitle="Maybe later"
              //   handle delete api and logout will be called
              onLowerBtnPress={() => {
                // logout();
                setModalVisible(false);
              }}
              // lowerBtnColour="#CC0000"
            />
          }
        />
      )}
      <RNText style={{ fontSize: 18, fontWeight: "bold" }}>
        Welcome to the Home!
      </RNText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderBlockColor: "red",
    // borderWidth: 2,
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default HomeScreen;
