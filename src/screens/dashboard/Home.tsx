import React, { useState } from "react";
import { View, Text as RNText } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DashboardTabParamList } from "../../navigation/DashboardNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSummary from "./profile/components/ProfileSummary";
import { PseudoModalScreen } from "./profile/components";
import CustomModal from "@/components/modals/CustomModal";
import VerificationNavigator from "@/navigation/VerificationNavigator";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";

// Use BottomTabScreenProps instead of StackScreenProps for tab navigation
type Props = BottomTabScreenProps<DashboardTabParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const profileNavigation = useProfileNavigation(); //THIS WHAT  WANTED TO USE BUT FAILED
  const [modalVisible, setModalVisible] = useState(false);
  /**Time out that run in 5 secs  */
  setTimeout(() => {
    setModalVisible(true);
  }, 5000);
  //TE BELOW WILL BE USED BUT IT IS FAILING, THE MODAL NOT COMING
  // const timeOut =()=> setTimeout(() => {
  //   setModalVisible(true);
  // }, 5000); //after 5 secs display the modal
  // const handleModalVisibility = () => {
  //   clearTimeout(timeOut());
  // };
  // handleModalVisibility();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ProfileSummary />
      {modalVisible && (
        <CustomModal
          content={
            <PseudoModalScreen
              headerText="Welcome, Faruq" //This should come from state i.e current user.firstname
              description="For everyone’s safety, only verified users can join or offer rides on Share."
              upperBtnTitle="OK, Let’s do it now"
              onUpperBtnPress={() => {
                navigation.navigate("Profile"); //go to verification //NEED O LEARN NESTED ROUTE
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

export default HomeScreen;
