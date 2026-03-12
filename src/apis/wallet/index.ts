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

/** Fund the wallet */
export function fundWalletApi(dto: FundWalletDto) {
  return request.post<GenericResponse<Wallet>>("/wallet/fund", dto);
}

/** Request a withdrawal */
export function requestWithdrawalApi(dto: WithdrawalRequestDto) {
  return request.post<GenericResponse<WithdrawalRequest>>(
    "/wallet/withdraw",
    dto
  );
}

/** Cancel a pending withdrawal */
export function cancelWithdrawalApi(id: string) {
  return request.delete<GenericResponse<WithdrawalRequest>>(
    `/wallet/withdraw/${id}`
  );
}
