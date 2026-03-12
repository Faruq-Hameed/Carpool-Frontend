import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { ProfileStackParamList } from "@/navigation/ProfileStackNavigator";
import { VerificationStackParamList } from "@/navigation/VerificationNavigator";
import { RootStackParamList } from "@/navigation/RootNavigator";
import { RideStackParamList } from "@/navigation/RideStackNavigator";

type RootNavigationKey = keyof RootStackParamList;
/**Use this hook to get the navigation prop of the RootStack navigator. */
export function useRootNavigation<RouteName extends RootNavigationKey>() {
  return useNavigation<StackNavigationProp<RootStackParamList, RouteName>>();
}

type NavigationKey = keyof AuthStackParamList;

export function useAuthNavigation<RouteName extends NavigationKey>() {
  return useNavigation<StackNavigationProp<AuthStackParamList, RouteName>>();
}

type ProfileNavigationKey = keyof ProfileStackParamList;
/**Use this hook to get the navigation prop of the ProfileStack navigator. */
export function useProfileNavigation<RouteName extends ProfileNavigationKey>() {
  return useNavigation<StackNavigationProp<ProfileStackParamList, RouteName>>();
}

type VerificationNavigationKey = keyof VerificationStackParamList;
/**Use this hook to get the navigation prop of the Verification navigator. */
export function useVerificationNavigation<
  RouteName extends VerificationNavigationKey
>() {
  return useNavigation<
    StackNavigationProp<VerificationStackParamList, RouteName>
  >();
}

type RideNavigationKey = keyof RideStackParamList;
/** Use this hook to get the navigation prop of the RideStack navigator. */
export function useRideNavigation<RouteName extends RideNavigationKey>() {
  return useNavigation<StackNavigationProp<RideStackParamList, RouteName>>();
}
