import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyWalletApi,
  getMyTransactionsApi,
  fundWalletApi,
  requestWithdrawalApi,
  getPendingWithdrawalApi,
  cancelWithdrawalApi,
} from "@/apis/wallet";
import { FundWalletDto, WithdrawalRequestDto } from "@/apis/wallet/types";

export const walletKeys = {
  all: ["wallet"] as const,
  me: () => ["wallet", "me"] as const,
  transactions: (page: number, size: number) =>
    ["wallet", "transactions", page, size] as const,
  pendingWithdrawal: () => ["wallet", "withdraw", "pending"] as const,
};

export function useMyWallet() {
  return useQuery({
    queryKey: walletKeys.me(),
    queryFn: () => getMyWalletApi().then((r) => r.data.data),
  });
}

export function useMyTransactions(page = 1, size = 10) {
  return useQuery({
    queryKey: walletKeys.transactions(page, size),
    queryFn: () => getMyTransactionsApi(page, size).then((r) => r.data.data),
  });
}

export function usePendingWithdrawal() {
  return useQuery({
    queryKey: walletKeys.pendingWithdrawal(),
    queryFn: () => getPendingWithdrawalApi().then((r) => r.data.data),
  });
}

export function useFundWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: FundWalletDto) =>
      fundWalletApi(dto).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: walletKeys.me() });
      qc.invalidateQueries({ queryKey: walletKeys.transactions(1, 10) });
    },
  });
}

export function useRequestWithdrawal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: WithdrawalRequestDto) =>
      requestWithdrawalApi(dto).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: walletKeys.me() });
      qc.invalidateQueries({ queryKey: walletKeys.pendingWithdrawal() });
    },
  });
}

export function useCancelWithdrawal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelWithdrawalApi(id).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: walletKeys.me() });
      qc.invalidateQueries({ queryKey: walletKeys.pendingWithdrawal() });
    },
  });
}
