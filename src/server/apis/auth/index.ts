import request from "../interceptor";
import { GenericResponse } from "../types";
import { LoginRequestPayload, LoginResponsePayload, RegisterRequestPayload } from "./types";

/**Login api call */
export function loginUserApi(payload: LoginRequestPayload) {
  return request.post<GenericResponse<LoginResponsePayload>>('/auths/login', payload);
}


/**SignUp api call */
export function SignUpApi(payload: RegisterRequestPayload) {
  return request.post<GenericResponse<{data: any, message: string}>>('/users', payload);
}