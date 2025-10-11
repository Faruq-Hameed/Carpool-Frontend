import request from "../interceptor";
import { GenericResponse } from "../types";
import { LoginRequestPayload, LoginResponsePayload } from "./types";

/**Login api call */
export function loginUserApi(payload: LoginRequestPayload) {
  return request.post<GenericResponse<LoginResponsePayload>>('/auths/login', payload);
}