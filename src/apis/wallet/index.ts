import request from "../interceptor";
import { GenericResponse, PaginatedData } from "../types";
import {
  Wallet,
  WalletTransaction,
  WithdrawalRequest,
  FundWalletDto,
  WithdrawalRequestDto,
} from "./types";

/** Get the current user's wallet */
export function getMyWalletApi() {
  return request.get<GenericResponse<Wallet>>("/wallet/me");
}

/** Get wallet transaction history */
export function getMyTransactionsApi(page = 1, size = 10) {
  return request.get<GenericResponse<PaginatedData<WalletTransaction>>>(
    "/wallet/transactions",
    { params: { page, size } }
  );
}

/** Fund the wallet (returns the credit transaction) */
export function fundWalletApi(dto: FundWalletDto) {
  return request.post<GenericResponse<WalletTransaction>>("/wallet/fund", dto);
}

/** Request a withdrawal */
export function requestWithdrawalApi(dto: WithdrawalRequestDto) {
  return request.post<GenericResponse<WithdrawalRequest>>(
    "/wallet/withdraw",
    dto
  );
}

/** Get my current pending withdrawal, if any (null if none) */
export function getPendingWithdrawalApi() {
  return request.get<GenericResponse<WithdrawalRequest | null>>(
    "/wallet/withdraw/pending"
  );
}

/** Cancel a pending withdrawal */
export function cancelWithdrawalApi(id: string) {
  return request.delete<GenericResponse<WithdrawalRequest>>(
    `/wallet/withdraw/${id}`
  );
}
