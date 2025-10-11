import User from "@/models/User";

export interface LoginRequestPayload{
    userField: string;
    passcode: string;
}

export interface LoginResponsePayload {
  token: string;
  user:User;
}

