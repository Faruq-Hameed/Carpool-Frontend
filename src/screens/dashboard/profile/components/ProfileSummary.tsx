import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "@/components/texts";
import { AppIcon } from "@/components/AppIcon";

const ProfileSummary: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {/* The user profile pic should be displayed here. or first char of name */}
        <Text>F</Text>
      </View>
      {/* Name container */}
      <View>
        <Text style={styles.name} h4>
          Hameed Faruq
        </Text>
        {/* /Actual period will be used e.g*/}
        <Text style={styles.period}>Good afternoon</Text>
      </View>
      {/* wallet container */}
      <View style={styles.rightContainer}>
        <View style={styles.walletContainer}>
          {/* /*Actual amount will be used*/}
          <AppIcon name="whiteWallet" />
          <Text style={styles.balance} h4 h4Style={styles.rating}>
            {" "}
            N10,000.00
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          <AppIcon name="star" />
          <Text style={styles.rating} h4 h4Style={styles.rating}>
            4/5
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 5,
    paddingBottom: 15,
  },
  leftContainer: {
    borderWidth: 0.4,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 80,
    backgroundColor: "#F7F7F7",
    borderColor: "#595959",
  },

  name: {
    fontSize: 18,
    fontWeight: 700,
  },
  period: {
    fontSize: 14,
  },
  rightContainer: {
    borderColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
  walletContainer: {
    backgroundColor: "#3D663F",
    paddingHorizontal: 5,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    color: "white",
  },
  balance: {
    fontSize: 14,
    fontWeight: 600,
    color: "#FFFFFF",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  rating: {
    fontSize: 14,
    fontWeight: 600,
  },
});

export default ProfileSummary;
