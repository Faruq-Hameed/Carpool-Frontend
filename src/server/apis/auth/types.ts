import User from "@/models/User";
import { GenericResponse } from "../types";

export interface LoginRequestPayload {
  userField: string;
  passcode: string;
}

export interface LoginResponsePayload {
  token: string;
  user: User;
}

export interface RegisterRequestPayload {
  email: string;
  firstName: string;
  lastName: string;
  passcode: string;
}
