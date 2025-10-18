import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PassCodeInput from "./PassCodeInput";
import ShowPassCheckBox from "./ShowPassCheckBox";

import UnderlineButton from "../buttons/UnderLineBtn";
import { useAuthNavigation } from "../../hooks/useTypedNavigation";

/**  Reusable PassCodeInput component. Expecting title, placeholder, value, onChangeText, keyboardType */
interface PassCodeUtilsProps {
  setPassCode: (text: string) => void;
  value: string;
  label: string;
  hideForgetPassword?: boolean; //maybe to show the forget password link or not
  onBlur?: (e: any) => void; //optional onBlur prop for handling blur events will be compulsory if other screen have been adjusted
  onFocus?: (e: any) => void; //optional onFocus prop for handling focus events will be compulsory if other screen have been adjusted
  genericPlaceholder?: string,
}
/** PassCodeUtils component contains the ShowPassCheckBox and forgot password */
const PassCodeUtils: React.FC<PassCodeUtilsProps> = (
  //it should accept setPassCode,value, hideForgetPassword
  props
) => {
  // State variables for input fields
  const [hidePasscode, setHidePasscode] = useState(true); // THIS NOT YET WORKING AS EXPECTED
  const navigation = useAuthNavigation<"Login">();

  return (
    <View>
      <PassCodeInput
        label={props.label}
        value={props.value}
        onChangeText={props.setPassCode}
        hidePassCode={hidePasscode} //show password state
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        genericPlaceholder={props.genericPlaceholder}
      />
      {/*password show and forget password*/}
      <View style={styles.flexItems}>
        <ShowPassCheckBox
          checked={hidePasscode}
          onPress={() => setHidePasscode(!hidePasscode)} //change show password state to opposite
        />
        {!props.hideForgetPassword && (
          <UnderlineButton
            title="Forget passcode?"
            onPress={() => navigation.navigate("ForgotPasscode")} //api to be called here too
            marginTop={5}
            marginAuto= {false}
            
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexItems: {
    flexDirection: "row",
    paddingRight: 10,
    position: "relative",
    top:-10,
    // borderWidth: 1,
    alignContent: "space-between",
    justifyContent: "space-between",
  },
});
export default PassCodeUtils;
