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
import { ApiStatus } from "@/utils/constants/ApiStatus";

import { 
  LocationInput, 
  DateTimePicker, 
  TabSelector, 
  RideSearchForm 
} from './components';
import { AppIcon } from "@/components/others/AppIcon";
import Spacer from "@/components/others/Spacer";

// Use BottomTabScreenProps instead of StackScreenProps for tab navigation
type Props = BottomTabScreenProps<DashboardTabParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const rootNavigation = useRootNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [hasModalShown, setHasShown] = useState(false); // track if modal was shown once

 // State for ride search
  const [activeTab, setActiveTab] = useState<'find' | 'offer'>('find');
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [selectedDate, setSelectedDate] = useState('Fri, 11 April');
  const [selectedTime, setSelectedTime] = useState('9:05 AM');

  const { currentUser, UserKycStatus } = useAuth();
  useEffect(() => {
    if (!hasModalShown) {
      const timer = setTimeout(() => {
        setModalVisible(true);
        setHasShown(true); // mark as shown so it never triggers again
      }, 5000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [hasModalShown]);
  /**User is verified if nin and dob are verified */
  const isVerified =
    UserKycStatus.dobStatus === ApiStatus.VERIFIED &&
    UserKycStatus.ninStatus === ApiStatus.VERIFIED;


     const handleDatePress = () => {
    // Open your date picker modal
  };

  const handleTimePress = () => {
    // Open your time picker modal
  };

  const handleFindRide = () => {
    if (!leavingFrom || !goingTo) {
      // Show error toast
      return;
    }
    // Navigate to search results
    // navigation.navigate('RideResults', {
    //   from: leavingFrom,
    //   to: goingTo,
    //   date: selectedDate,
    //   time: selectedTime,
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileSummary />
      {/* Show verification box if user is not verified */}
      {!isVerified && <VerificationBox />}
      {modalVisible && !isVerified && (
        <CustomModal
          onClose={() => setModalVisible(false)}
          visible={modalVisible}
          children={
            <PseudoModalScreen
              headerText={`Welcome, ${currentUser.firstName ?? "User"}`} //This should come from state i.e current user.firstname
              description="For everyone’s safety, only verified users can join or offer rides on Share."
              upperBtnTitle="OK, Let’s do it now"
              onUpperBtnPress={() => {
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
      <Spacer />
      {/* Tab Selector */}
      <TabSelector
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'offer') {
            console.log('Navigate to Offer Ride screen');
            // navigation.navigate('OfferRide');
          }
        }}
        findIcon={<AppIcon name="carProfile" size={20} />}
        offerIcon={<AppIcon name="carProfile" size={20}/>}
      />

      {/* Ride Search Form */}
      <RideSearchForm
        leavingFrom={leavingFrom}
        goingTo={goingTo}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onLeavingFromChange={setLeavingFrom}
        onGoingToChange={setGoingTo}
        onDatePress={handleDatePress}
        onTimePress={handleTimePress}
        onFindRide={handleFindRide}
        mapPinIcon={<AppIcon name="headset" size={20} />}
        navigationIcon={<AppIcon name="pencilSimpleLine" size={20}  />}
        calendarIcon={<AppIcon name="caretRight" size={20}  />}
        clockIcon={<AppIcon name="caretRight" size={20}  />}
      />
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
