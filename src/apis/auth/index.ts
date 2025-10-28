import User from "@/models/User";
import request from "../interceptor";
import { GenericResponse } from "../types";
import {
  LoginRequestPayload,
  AuthResponsePayload,
  RegisterRequestPayload,
  VerifyEmailPayload,
  VerifyPhonePayload,
  GenerateResetPasscodeOtpPayload,
  ResetPasscodePayload,
  createJobIdRequestPayload,
  changeEmailPayload,
} from "./types";

/**Login api call */
export function loginUserApi(payload: LoginRequestPayload) {
  return request.post<GenericResponse<AuthResponsePayload>>(
    "/auths/login",
    payload
  );
}

/**SignUp api call */
export function SignUpApi(payload: RegisterRequestPayload) {
  return request.post<GenericResponse<User>>("/users", payload); //THE GENERIC RESPONSE TYPE HERE IS NOT PERFECT. DON'T KNOW WHAT TO PUT
}

/**Verify email api call */
export function verifyEmailApi(payload: VerifyEmailPayload) {
  return request.post<GenericResponse<AuthResponsePayload>>(
    "/auths/verify/email",
    payload
  );
}

/**Create reset passcode otp */
export function generateResetPasscodeOtpApi(
  payload: GenerateResetPasscodeOtpPayload
) {
  return request.post<GenericResponse<null>>("/otps", payload);
}

/**Api to call to reset passcode */
export function resetPasscodeApi(payload: ResetPasscodePayload) {
  return request.post<GenericResponse<null>>("/auths/passcode", payload);
}

export function verifyPhoneApi(payload: VerifyPhonePayload) {
  return request.post<GenericResponse<AuthResponsePayload>>(
    "/auths/verify/phone",
    payload
  );
}

/**Change email api */
export function changeEmailApi(payload: changeEmailPayload) {
  return request.put<GenericResponse<null>>(
    "auths/verify/email",
    payload
  );
}

export function changePhoneApi(payload: VerifyPhonePayload) {
  return request.put<GenericResponse<AuthResponsePayload>>(
    "/auths/verify/phone",
    payload
  );
}

/**Api to create job id with passcode */
export function createJobId(payload: createJobIdRequestPayload) {
  return request.put<GenericResponse<string>>("verify/phone", payload);
}

/**Api to get user */
export function getMe() {
  return request.get<GenericResponse<User>>("/users/me");
}
