import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { ProfileStackParamList } from "@/navigation/ProfileStackNavigator";

//
type NavigationKey = keyof AuthStackParamList;

export function useTypedNavigation<RouteName extends NavigationKey>() {
  return useNavigation<StackNavigationProp<AuthStackParamList, RouteName>>();
}

type ProfileNavigationKey = keyof ProfileStackParamList;
/**Use this hook to get the navigation prop of the ProfileStack navigator. */
export function useProfileNavigation<RouteName extends ProfileNavigationKey>() {
  return useNavigation<StackNavigationProp<ProfileStackParamList, RouteName>>();
}