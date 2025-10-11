export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  phoneNumber: string | null;
  phoneStatus: string;
  email: string;
  emailStatus: string;
  profilePicture?: string | null;
  createdAt: string; // ISO date string
  verificationLevel: string;
}
