import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMyTransactions } from "@/hooks/useWallet";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { WalletTransaction } from "@/apis/wallet/types";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PaginatedFlatList } from "@/components/shared/PaginatedFlatList";
import { Colors, Spacing } from "@/theme";
import { TransactionRow } from "./components/TransactionRow";

const PAGE_SIZE = 20;

const TransactionHistoryScreen: React.FC = () => {
  const navigation = useProfileNavigation();
  const [page, setPage] = useState(1);
  const [allTx, setAllTx] = useState<WalletTransaction[]>([]);

  const { data, isLoading, isFetching, refetch } = useMyTransactions(
    page,
    PAGE_SIZE
  );

  useEffect(() => {
    if (!data?.docs) return;
    setAllTx((prev) => (page === 1 ? data.docs : [...prev, ...data.docs]));
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (data && page < data.total_pages && !isFetching) {
      setPage((p) => p + 1);
    }
  }, [data, page, isFetching]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader
        title="Transaction History"
        onBack={() => navigation.goBack()}
      />

      <PaginatedFlatList
        data={allTx}
        renderItem={(tx) => <TransactionRow transaction={tx} />}
        keyExtractor={(tx) => tx.id}
        isLoading={isLoading && page === 1}
        isFetchingNextPage={isFetching && page > 1}
        hasNextPage={data ? page < data.total_pages : false}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        isRefreshing={isFetching && page === 1 && allTx.length > 0}
        emptyTitle="No transactions yet"
        emptySubtitle="All your wallet activity will show up here."
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
});

export default TransactionHistoryScreen;
