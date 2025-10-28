import User from "@/models/User";
import request from "../interceptor";
import { GenericResponse } from "../types";
import {
  GeneratePrivateOtpPayload,
  ValidatePhoneRequestPayload,
  VerifyPhonePayload,
} from "./types";
import { VerifyOtpPurposes } from "@/screens/auth/constants";

/**Create verify phone otp */
export function generatePrivateOtpApi(payload: GeneratePrivateOtpPayload) {
  console.log("payload passed is :", payload);
  const { purpose } = payload;
  return request.post<GenericResponse<null>>("/otps/private", {
    ...payload,
    purpose:
      purpose === VerifyOtpPurposes.CHANGE_PHONE
        ? "VERIFY_PHONE" //change phone must be verify phone too
      
        : purpose, 
  });
}

/**Api that validates if phone number already in used or not */
export function validatePhoneNumberApi(payload: ValidatePhoneRequestPayload) {
  return request.get<GenericResponse<null>>("users/exist", { params: payload });
}

// export function changeEmailApi(payload: VerifyEmailPayload) {
//   return request.put<GenericResponse<AuthResponsePayload>>(
//     "verify/email",
//     payload
//   );
// }

// export function changePhoneApi(payload: VerifyPhonePayload) {
//   return request.put<GenericResponse<AuthResponsePayload>>(
//     "verify/phone",
//     payload
//   );
// }

/**Api to create job id with passcode */
// export function createJobId(payload: createJobIdRequestPayload) {
//   return request.put<GenericResponse<string>>("verify/phone", payload);
// }
