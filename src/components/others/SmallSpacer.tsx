import React ,  { ReactNode }from "react";
import { View  } from "react-native";

/**Smaller spacer with margin 5 */
const SmallSpacer = ({ children }: { children?: ReactNode }) => {
    //To all the children rap within the component, it returns them with margin of 5
    //if the component is only used without any children then it returns a view component with margin of 5 
    // more like empty space(br tag in html)
    return <View style={{ margin: 5 }}>{children}</View>;
}

export default SmallSpacer;