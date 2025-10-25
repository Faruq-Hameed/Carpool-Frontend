export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  phoneNumber?: string;
  phoneStatus: string;
  email: string;
  emailStatus: string;
  profilePicture?: string | null;
  lastJobId?: string;
  createdAt: string; // ISO date string
  verificationLevel?: string;
}
