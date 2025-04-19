import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";

//
type NavigationKey = keyof AuthStackParamList;

export function useTypedNavigation<RouteName extends NavigationKey>() {
  return useNavigation<StackNavigationProp<AuthStackParamList, RouteName>>();
}
