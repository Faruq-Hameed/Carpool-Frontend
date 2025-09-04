import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PassCodeInput from "./PassCodeInput";
import ShowPassCheckBox from "./ShowPassCheckBox";

import UnderlineButton from "../UnderLineBtn";
import { useTypedNavigation } from "../../hooks/useTypedNavigation";

/**  Reusable PassCodeInput component. Expecting title, placeholder, value, onChangeText, keyboardType */
interface PassCodeUtilsProps {
  setPassCode: React.Dispatch<React.SetStateAction<string>>;
  setHidePasscode: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}
/** PassCodeUtils component contains the ShowPassCheckBox and forgot password */
const PassCodeUtils: React.FC<PassCodeUtilsProps> = (
  //it should accept setPassCode, setHidePasscode
  props
) => {
  // State variables for input fields
  const [passCode, setPassCode] = useState<string>("");
  const [hidePasscode, setHidePasscode] = useState(true);
  const navigation = useTypedNavigation<"Login">();

  return (
    <View>
      <PassCodeInput
        label={props.label}
        value={passCode}
        onChangeText={setPassCode}
        hidePassCode={hidePasscode} //show password state
      />
      {/*password show and forget password*/}
      <View style={styles.flexItems}>
        <ShowPassCheckBox
          checked={hidePasscode}
          onPress={() => setHidePasscode(!hidePasscode)} //change show password state to opposite
        />
        <UnderlineButton
          title="Forget passcode?"
          onPress={() => navigation.navigate("ForgotPasscode")} //api to be called here too
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
export default PassCodeUtils;
