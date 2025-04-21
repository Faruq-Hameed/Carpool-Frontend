import React from "react";
import { View, StyleSheet, Image, Button, Dimensions } from "react-native";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../../types/navigation";
import { useTypedNavigation } from "../../hooks/useTypedNavigation";
import NavButton from "../../components/greenButton";
import { Text } from "@rneui/base";
import { width } from "../../utils/constants/constants";

/** Welcome screen is the first screen that the user sees when they open the app
It displays a welcome message and a button to navigate to the SignUp screen */
const WelcomeScreen: React.FC<ScreenProps<"Welcome">> = () => {
  const navigation = useTypedNavigation<"Welcome">();
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Display welcome image */}
      <View >
        <Image
          source={require("../../../assets/images/welcomeNew.png")}
          style={styles.image}
        />
        {/*Text container*/}
        <View>
          <Text h1 >
            Share Ride, Share Cost
          </Text>
          <Text >
            Split your transport cost when you carpool and keep your wallet
            happy
          </Text>
        </View>
        {/* Dots to indicate the current page */}
        <View style={styles.dotsContainer}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
        </View>
      </View>

      {/* Navigation buttons */}
      <View >
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
    paddingHorizontal: 5

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

export default WelcomeScreen;
