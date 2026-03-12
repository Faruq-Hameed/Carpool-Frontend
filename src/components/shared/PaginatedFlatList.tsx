import React, { useCallback } from "react";
import {
  FlatList,
  FlatListProps,
  ActivityIndicator,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Colors, Spacing } from "@/theme";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";

interface PaginatedFlatListProps<T>
  extends Omit<FlatListProps<T>, "data" | "renderItem" | "keyExtractor"> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  keyExtractor: (item: T) => string;
  isLoading: boolean;
  /** True while fetching the next page */
  isFetchingNextPage?: boolean;
  /** False → no more pages to load */
  hasNextPage?: boolean;
  /** Called when the user scrolls near the end */
  onLoadMore?: () => void;
  /** Pull-to-refresh callback */
  onRefresh?: () => void;
  isRefreshing?: boolean;
  /** Override the default empty state */
  emptyState?: React.ReactNode;
  emptyTitle?: string;
  emptySubtitle?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * FlatList wrapper that handles:
 *  - Initial loading state
 *  - Pull-to-refresh
 *  - Load-more on scroll end
 *  - Empty state
 */
export function PaginatedFlatList<T>({
  data,
  renderItem,
  keyExtractor,
  isLoading,
  isFetchingNextPage = false,
  hasNextPage = false,
  onLoadMore,
  onRefresh,
  isRefreshing = false,
  emptyState,
  emptyTitle = "Nothing here yet",
  emptySubtitle,
  contentContainerStyle,
  ...rest
}: PaginatedFlatListProps<T>) {
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && onLoadMore) {
      onLoadMore();
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  if (isLoading && data.length === 0) {
    return <LoadingState />;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => renderItem(item, index)}
      keyExtractor={keyExtractor}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={
        emptyState ? (
          <>{emptyState}</>
        ) : (
          <EmptyState title={emptyTitle} subtitle={emptySubtitle} />
        )
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        ) : null
      }
      contentContainerStyle={[
        data.length === 0 && styles.emptyContainer,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: Spacing.base,
    alignItems: "center",
  },
  emptyContainer: {
    flexGrow: 1,
  },
});
