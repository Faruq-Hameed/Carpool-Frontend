import { useState } from "react";
import { Text, View } from "react-native";
import { RideSearchForm } from "./RideSearchForm";
import { TabSelector } from "./TabSelector";

export const HomeScreenMiddleSection = () => {
  const [activeTab, setActiveTab] = useState<"find" | "offer">("find");
  const [leavingFrom, setLeavingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [selectedDate, setSelectedDate] = useState("Fri, 11 April");
  const [selectedTime, setSelectedTime] = useState("9:05 AM");

  const handleDatePress = () => {
    // Open date picker modal
    console.log("Open date picker");
  };

  const handleTimePress = () => {
    // Open time picker modal
    console.log("Open time picker");
  };

  const handleFindRide = () => {
    // Navigate to ride results or trigger search
    console.log("Finding rides...", {
      leavingFrom,
      goingTo,
      date: selectedDate,
      time: selectedTime,
    });
  };

  // Replace these with your actual icon components
  const SearchIcon = <Text>🔍</Text>;
  const PlusIcon = <Text>➕</Text>;
  const MapPinIcon = <Text>📍</Text>;
  const NavigationIcon = <Text>🧭</Text>;
  const CalendarIcon = <Text>📅</Text>;
  const ClockIcon = <Text>🕐</Text>;

  return (
    <View style={{ width: "100%" }}>
      <TabSelector
        activeTab={activeTab}
        onTabChange={setActiveTab}
        findIcon={SearchIcon}
        offerIcon={PlusIcon}
      />

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
        mapPinIcon={MapPinIcon}
        navigationIcon={NavigationIcon}
        calendarIcon={CalendarIcon}
        clockIcon={ClockIcon}
      />
    </View>
  );
};
