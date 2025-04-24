import React, { useState } from "react";
import { View, StyleSheet, Image, Button, Dimensions } from "react-native";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../../types/navigation";
import { useTypedNavigation } from "../../hooks/useTypedNavigation";
import NavButton from "../../components/greenButton";
import { Text } from "@rneui/base";
import { width } from "../../utils/constants/constants";
import UpperTextsFrame from "../../components/upperTextsFrame";
import PassCodeInput from "../../components/PassCodeInput";
import PassCodeUtils from "../../components/passcodeUtils";

/** Welcome screen is the first screen that the user sees when they open the app
It displays a welcome message and a button to navigate to the SignUp screen */
const WelcomeUserScreen: React.FC<ScreenProps<"WelcomeUser">> = () => {
  // State variables for input fields
  const [passCode, setPassCode] = useState<string>("");
  const [hidePasscode, setHidePasscode] = useState(true);
  const username = "faruq"; //this will come from the async storage
  const navigation = useTypedNavigation<"WelcomeUser">();
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/*upper container */}
      <UpperTextsFrame
        header={`Welcome ${username}`}
        normalText="Enter your passcode to login"
      />
      <PassCodeInput
        value={passCode}
        onChangeText={setPassCode}
        hidePassCode={hidePasscode} //show password state
      />
      {/*lower container */}
      <PassCodeUtils
        setPassCode={setPassCode}
        setHidePasscode={setHidePasscode} //show password state
      />
      {/* Navigation buttons */}
      <View>
        <NavButton
          title="Let’s get started"
          onPress={() => navigation.navigate("SignUp")}
        />
        <NavButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
          btnType="clear"
          bgColor="#FFFFFF"
          titleColor="#126415"
        />
      </View>
    </SafeAreaView>
  );
};

// Styles for the welcome screen
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    // borderWidth: 2,
    borderBlockColor: "red",
    paddingHorizontal: 5,
  },

  image: {
    width: 275,
    height: 220,
    borderRadius: 12,
    borderWidth: 2,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  activeDot: {
    width: 30,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#126415",
    marginHorizontal: 4,
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C4C4C4",
    marginHorizontal: 4,
  },
});

export default WelcomeUserScreen;
