export type TransactionType = "CREDIT" | "DEBIT";
export type TransactionReason =
  | "RIDE_EARNING"
  | "RIDE_REFUND"
  | "RIDE_PAYMENT"
  | "MANUAL_CREDIT"
  | "MANUAL_DEBIT";
export type WithdrawalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: TransactionType;
  reason: TransactionReason;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  reference?: string;
  createdAt: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface WithdrawalRequest {
  id: string;
  walletId: string;
  amount: number;
  status: WithdrawalStatus;
  bankDetails: BankDetails;
  createdAt: string;
  updatedAt: string;
}

// ─── DTOs ────────────────────────────────────────────────────────────────────

export interface FundWalletDto {
  amount: number;
  reference?: string;
}

export interface WithdrawalRequestDto {
  amount: number;
  bankDetails: BankDetails;
}
