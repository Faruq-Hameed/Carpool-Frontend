import User from "@/models/User";
import { ApiStatus } from "@/utils/constants/ApiStatus";

export const intialAuthContextState = {
  currentUser: {
    id: "", //place holder
    isVerified: false,
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    phoneStatus: "",
    email: "",
    emailStatus: "",
    profilePicture: "",
    createdAt: "", // ISO date string
    verificationLevel: "",
  } as User,
  isLoggedIn: false,
  token: null,
  kycStatus: {
    dobStatus: ApiStatus.NOT_VERIFIED,
    ninStatus: ApiStatus.NOT_VERIFIED,
  }
};

export type InitialState = typeof intialAuthContextState;
