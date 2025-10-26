import { VerifyOtpPurposes } from "@/screens/auth/constants";

/**payload to verify if phone number already used */
export interface ValidatePhoneRequestPayload {
  phoneNumber: string;
}

export interface GenerateVerifyPhoneOtpPayload {
  phoneNumber: string;
  purpose: VerifyOtpPurposes.VERIFY_PHONE;
  passcode?: string; //need to change phone
}

export interface VerifyPhonePayload {
  phoneNumber: string;
  otp: string;
}

/**Payload to create jobId with the passcode */
export interface createJobIdRequestPayload {
  passcode: string;
  purpose: VerifyOtpPurposes;
}