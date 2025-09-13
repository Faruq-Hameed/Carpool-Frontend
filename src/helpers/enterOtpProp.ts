import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { VerificationStackParamList } from "@/navigation/VerificationNavigator";
import { RouteProp } from "@react-navigation/native";

export type EnterOTPRouteProps =
  | RouteProp<AuthStackParamList, "EnterOTP">
  | RouteProp<VerificationStackParamList, "VerificationOtp">;

export interface EnterOTPProps {
  route: EnterOTPRouteProps;
}
