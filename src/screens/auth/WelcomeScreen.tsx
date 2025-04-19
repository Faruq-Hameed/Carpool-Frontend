import React from "react";
import { View, StyleSheet, Image, Button, Dimensions } from "react-native";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../../types/navigation";
import { useTypedNavigation } from "../../hooks/useTypedNavigation";
import NavButton from "../../components/greenButton";
import { Text } from "@rneui/base";

/** Welcome screen is the first screen that the user sees when they open the app
It displays a welcome message and a button to navigate to the SignUp screen */
const WelcomeScreen: React.FC<ScreenProps<"Welcome">> = () => {
  const navigation = useTypedNavigation<"Welcome">();
  return (
    <SafeAreaView>
      {/* Display welcome image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/welcomeNew.png")}
          style={styles.image}
        />
      </View>
      {/*Text container*/}
      <View>
        <Text h1 style={styles.heading}>
          Share Ride, Share Cost
        </Text>
        <Text style={styles.subText}>
          Split your transport cost when you carpool and keep your wallet happy
        </Text>
      </View>
      {/* Dots to indicate the current page */}
      <View style={styles.dotsContainer}>
        <View style={styles.activeDot} />
        <View style={styles.inactiveDot} />
      </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 16,
    width: 375,
    height: 375,
    borderWidth: 2,
    borderColor: "red",
  },
  image: {
   
    resizeMode: "contain",
    borderRadius: 12,
    // height: 220,
  },
  textsContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    color: "#1A1A1A",
    fontWeight: "700",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    color: "#444",
    lineHeight: 20,
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
  // buttonsContainer: {
  //   paddingBottom: 24,
  //   gap: 12,
  // },
});

export default WelcomeScreen;
