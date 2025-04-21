import React ,  { ReactNode }from "react";
import { View, Text,  } from "react-native";

const Spacer = ({ children }: { children?: ReactNode }) => {
    //To all the children rap within the component, it returns them with margin of 10
    //if the component is only used without any children then it returns a view component with margin of 10 
    // more like empty space(br tag in html)
    return <View style={{ margin: 10 }}>{children}</View>;
}

export default Spacer;