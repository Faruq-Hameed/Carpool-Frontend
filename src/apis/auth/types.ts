export interface LoginRequestPayload{
    userField: string;
    passcode: string;
}

export interface LoginResponsePayload {
  token: string;
  user: {
    id: string;
    phoneNumber: string | null;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

