export type TransactionType = "CREDIT" | "DEBIT";
export type TransactionReason =
  | "FUND"
  | "RIDE_PAYMENT"
  | "RIDE_REFUND"
  | "RIDE_EARNING"
  | "WITHDRAWAL"
  | "WITHDRAWAL_REVERSAL"
  | "DIRECT_CREDIT"
  | "DIRECT_DEBIT";
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
  userId: string;
  amount: number;
  status: WithdrawalStatus;
  bankDetails: BankDetails;
  adminNote?: string;
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
