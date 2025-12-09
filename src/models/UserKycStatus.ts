import { ApiStatus } from "@/utils/constants/ApiStatus";

export default interface UserKycStatus{
      ninStatus: ApiStatus;
      dobStatus: ApiStatus;
      faceCapture: ApiStatus;
}