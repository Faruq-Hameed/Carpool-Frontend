import User from "@/models/User";
import { VerifyOtpPurposes } from "@/screens/auth/constants";

export interface LoginRequestPayload {
  userField: string;
  passcode: string;
}

export interface AuthResponsePayload {
  token: string;
  user: User;
}

export interface RegisterRequestPayload {
  email: string;
  firstName: string;
  lastName: string;
  passcode: string;
}

export interface VerifyEmailPayload {
  email?: string;
  otp: string;
}

export interface VerifyEmailResponse {
  message: string;
  data: AuthResponsePayload;
}

export interface VerifyPhonePayload {
  phoneNumber: string;
  otp: string;
}

export interface GenerateResetPasscodeOtpPayload {
  email?: string;
  phoneNumber?: string;
  purpose: "RESET_PASSCODE";
  // passcode: string;
}

export interface ResetPasscodePayload {
  email: string | null;
  phoneNumber: string | null;
  otp: string;
  passcode: string;
}

/**Payload to create jobId with the passcode */
export interface createJobIdRequestPayload {
  passcode: string;
  purpose: VerifyOtpPurposes;
}

