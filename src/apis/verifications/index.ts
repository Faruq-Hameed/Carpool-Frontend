import User from "@/models/User";
import request from "../interceptor";
import { GenericResponse } from "../types";
import {
  GeneratePrivateOtpPayload,
  UpdateNamesRequestPayload,
  ValidatePhoneRequestPayload,
  VerifyNinRequestPayload,
  VerifyPhonePayload,
} from "./types";
import { VerifyOtpPurposes } from "@/screens/auth/constants";
import UserKycStatus from "@/models/UserKycStatus";

/**Create verify phone otp */
export function generatePrivateOtpApi(payload: GeneratePrivateOtpPayload) {
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
  return request.get<GenericResponse<null>>("/users/exist", {
    params: payload,
  });
}

/**Api to update any part of names[first, last or middle name] */
export function updateUserNamesApi(payload: UpdateNamesRequestPayload) {
  return request.put<GenericResponse<User>>("/users/names", payload);
}

/**Api to verify nin */
export function verifyNinApi(payload: VerifyNinRequestPayload) {
  console.log({ payload });
  return request.post<GenericResponse<UserKycStatus>>("users/nin", payload);
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
