import User from "@/models/User";
import request from "../interceptor";
import { GenericResponse } from "../types";
import {
  GenerateVerifyPhoneOtpPayload,
  ValidatePhoneRequestPayload,
  VerifyPhonePayload,
} from "./types";

/**Create verify phone otp */
export function generateVerifyPhoneOtpApi(
  payload: GenerateVerifyPhoneOtpPayload
) {
  console.log("payload passed is :", payload);
  return request.post<GenericResponse<null>>("/otps/private", payload);
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
