import { VerifyOtpPurposes } from "@/screens/auth/constants";
import { ApiStatus } from "@/utils/constants/ApiStatus";

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

/** Update user names api */
export interface UpdateNamesRequestPayload {
  firstName?: string;
  lastName?: string;
  middleName?: string;
}

// export interface UpdateNamesResponsePayload {
//   firstName: string;
//   lastName: string;
//   middleName: string;
// }

/**Verify NIN Api payload */
export interface VerifyNinRequestPayload {
  nin: string;
  dob: Date;
}

export interface KycStatus {
  ninStatus: ApiStatus;
  dobStatus: ApiStatus;
  //other kyc statuses will be added
  //This interface can be used when we need to check any user kyc status
}
