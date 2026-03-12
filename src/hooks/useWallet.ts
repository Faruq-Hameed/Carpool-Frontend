import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyWalletApi,
  getMyTransactionsApi,
  fundWalletApi,
  requestWithdrawalApi,
  cancelWithdrawalApi,
} from "@/apis/wallet";
import { FundWalletDto, WithdrawalRequestDto } from "@/apis/wallet/types";

export const walletKeys = {
  all: ["wallet"] as const,
  me: () => ["wallet", "me"] as const,
  transactions: (page: number, size: number) => ["wallet", "transactions", page, size] as const,
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

export function useFundWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: FundWalletDto) => fundWalletApi(dto).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: walletKeys.me() }),
  });
}

export function useRequestWithdrawal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: WithdrawalRequestDto) =>
      requestWithdrawalApi(dto).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: walletKeys.me() }),
  });
}

export function useCancelWithdrawal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelWithdrawalApi(id).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: walletKeys.me() }),
  });
}
