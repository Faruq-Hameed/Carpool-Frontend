import User from "@/models/User";
import request from "../interceptor";
import { GenericResponse } from "../types";
import {
  LoginRequestPayload,
  AuthResponsePayload,
  RegisterRequestPayload,
  VerifyEmailPayload,
  VerifyPhonePayload,
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
  return request.post<GenericResponse<User>>( //THE GENERIC RESPONSE TYPE HERE IS NOT PERFECT. DON'T KNOW WHAT TO PUT
    "/users",
    payload
  );
}

/**Verify email api call */
export function verifyEmailApi(payload: VerifyEmailPayload) {
  return request.post<GenericResponse<AuthResponsePayload>>(
    "verify/email",
    payload
  );
}

/**Verify email api call */
export function forgotPasscodeApi(payload: VerifyEmailPayload) {
  return request.post<GenericResponse<AuthResponsePayload>>(
    "verify/email",
    payload
  );
}


export function verifyPhoneApi(payload: VerifyPhonePayload) {
  return request.post<GenericResponse<AuthResponsePayload>>("verify/phone", payload);
}

export function changeEmailApi(payload: VerifyEmailPayload) {
  return request.put<GenericResponse<AuthResponsePayload>>("verify/email", payload);
}

export function changePhoneApi(payload: VerifyPhonePayload) {
  return request.put<GenericResponse<AuthResponsePayload>>("verify/phone", payload);
}