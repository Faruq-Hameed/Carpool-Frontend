
import React, { useState } from "react";
import { View } from "react-native";
import PassCodeInput from "./PassCodeInput";
import ShowPassCheckBox from "./ShowPassCheckBox";

import UnderlineButton from "./UnderLineBtn";
import { useTypedNavigation } from "../hooks/useTypedNavigation";

/**  Reusable PassCodeInput component. Expecting title, placeholder, value, onChangeText, keyboardType */
interface PassCodeUtilsProps {
  setPassCode: React.Dispatch<React.SetStateAction<string>>;
  setHidePasscode: React.Dispatch<React.SetStateAction<boolean>>;
}

const PassCodeUtils: React.FC<PassCodeUtilsProps> = ( //it should accept setPassCode, setHidePasscode
    props,

) => {
  // State variables for input fields
  const [passCode, setPassCode] = useState<string>("");
  const [hidePasscode, setHidePasscode] = useState(true);
  const navigation = useTypedNavigation<"Login">();

  return (
    <View>
      <PassCodeInput
        value={passCode}
        onChangeText={setPassCode}
        hidePassCode={hidePasscode} //show password state
      />
      {/*password show and forget password*/}
      <View>
        <ShowPassCheckBox
          checked={hidePasscode}
          onPress={() => setHidePasscode(!hidePasscode)} //change show password state to opposite
        />
        <UnderlineButton
          title="forget password"
          onPress={() => navigation.navigate("ForgotPasscode")} //api to be called here too
        />
      </View>
    </View>
  );
};

export default PassCodeUtils;
{/* <View>
<ShowPassCheckBox
  checked={hidePasscode}
  onPress={() => setHidePasscode(!hidePasscode)} //change show password state to opposite
/>
<UnderlineButton
  title="forget password"
  onPress={() =>navigation.navigate("ForgotPasscode")} //api to be called here too
/>
</View> */}