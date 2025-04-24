import React from "react";
import { View, StyleSheet, Image, Button, Dimensions } from "react-native";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../../types/navigation";
import { useTypedNavigation } from "../../hooks/useTypedNavigation";
import NavButton from "../../components/greenButton";
import { Text } from "@rneui/themed";
import { width } from "../../utils/constants/constants";

/** Welcome screen is the first screen that the user sees when they open the app
It displays a welcome message and a button to navigate to the SignUp screen */
const WelcomeScreen: React.FC<ScreenProps<"Welcome">> = () => {
  const navigation = useTypedNavigation<"Welcome">();
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Display welcome image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/welcomeNew.png")}
          style={styles.image}
        />
        {/*Text container*/}
        <View style={styles.textsContainer}>
          <Text h4 h4Style={{textAlign: "center"}}>Share Ride, Share Cost</Text>
          <Text style = {{textAlign: "center"}}>
          Split your transport cost when you carpool and keep your wallet happy. All within a secured, trusted platform
          </Text>
        </View>
        {/* Dots to indicate the current page */}
        <View style={styles.dotsContainer}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
        </View>
      </View>

      {/* Navigation buttons */}
      <View style={styles.buttonContainer}>
        <NavButton
          title="Let’s get started"
          onPress={() => navigation.navigate("SignUp")}
        />
        {/* <NavButton //TEMPORARY
          title="welcome Faruq Screen"
          onPress={() => navigation.navigate("WelcomeUser")}
        /> */}
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
   
    paddingHorizontal: 8,
  },
  imageContainer: {
    paddingTop: 50,
    height: 475,
   justifyContent: "center",
   
  },
  image: {
    width: 359,
    height: 292,
    margin: "auto",
    marginBottom: 30,
    
  },
  textsContainer: {    
    width: 303,
    margin: "auto",
    textAlignVertical: "center",
    
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

  buttonContainer: {
    margin: "auto",
    width: 375,
    // borderWidth: 1,
    // borderBlockColor: "red"
  },
});

export default WelcomeScreen;
