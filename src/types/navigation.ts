import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { MainTabParamList } from "../navigation/MainNavigator";

/** this is a type that represents the navigation prop for a specific screen in the AuthStackParamList
 it is used to type the props of the screen component */
export type ScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

//the MainStack ScreenProps uses the MainStackParamList
export type MainStackScreenProps<T extends keyof MainTabParamList> =
  StackScreenProps<MainTabParamList, T>;

