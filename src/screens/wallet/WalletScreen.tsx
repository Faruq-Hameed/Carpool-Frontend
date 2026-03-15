import React, { useState } from "react";
import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMyWallet, useMyTransactions } from "@/hooks/useWallet";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Colors, Spacing } from "@/theme";
import { WalletBalanceCard } from "./components/WalletBalanceCard";
import { TransactionRow } from "./components/TransactionRow";
import { FundWalletModal } from "./components/FundWalletModal";

const PREVIEW_COUNT = 5;

const WalletScreen: React.FC = () => {
  const navigation = useProfileNavigation();
  const [fundModalVisible, setFundModalVisible] = useState(false);

  const { data: wallet, isLoading: walletLoading } = useMyWallet();
  const {
    data: txData,
    isLoading: txLoading,
    refetch,
    isRefetching,
  } = useMyTransactions(1, PREVIEW_COUNT);

  const recentTx = txData?.docs ?? [];

  if (walletLoading) return <LoadingState message="Loading wallet..." />;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Wallet" onBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        {/* Balance card */}
        <WalletBalanceCard
          balance={Number(wallet?.balance ?? 0)}
          onFund={() => setFundModalVisible(true)}
          onWithdraw={() => navigation.navigate("WithdrawalScreen")}
        />

        {/* Recent transactions */}
        <View style={styles.section}>
          <SectionHeader
            title="Recent Transactions"
            actionLabel={recentTx.length > 0 ? "See All" : undefined}
            onAction={() => navigation.navigate("TransactionHistory")}
          />

          {txLoading ? (
            <LoadingState />
          ) : recentTx.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              subtitle="Your transaction history will appear here."
            />
          ) : (
            recentTx.map((tx) => <TransactionRow key={tx.id} transaction={tx} />)
          )}
        </View>
      </ScrollView>

      <FundWalletModal
        visible={fundModalVisible}
        onClose={() => setFundModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingTop: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
  section: {
    paddingHorizontal: Spacing.base,
    marginTop: Spacing.sm,
  },
});

export default WalletScreen;
