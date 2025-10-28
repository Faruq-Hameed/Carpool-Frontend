import { VerifyOtpPurposes } from "@/screens/auth/constants";

/**payload to verify if phone number already used */
export interface ValidatePhoneRequestPayload {
  phoneNumber: string;
}

export interface GeneratePrivateOtpPayload {
  phoneNumber?: string;
  email?: string;
  purpose: VerifyOtpPurposes;
  passcode?: string; //need to change phone
}

export interface VerifyPhonePayload {
  phoneNumber: string;
  otp: string;
}

export interface GenerateChangeEmailOtpPayload {
  email: string;
  purpose: VerifyOtpPurposes.RESET_EMAIL;
  passcode: string; //need to job id
}


/**Payload to create jobId with the passcode */
export interface createJobIdRequestPayload {
  passcode: string;
  purpose: VerifyOtpPurposes;
}