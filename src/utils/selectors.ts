import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// メモの基本セレクター
export const selectMemos = (state: RootState) => state.memos.items;
export const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
export const selectFilters = (state: RootState) => state.ui.filters;
export const selectSortBy = (state: RootState) => state.ui.sortBy;
export const selectSortOrder = (state: RootState) => state.ui.sortOrder;

// 検索とフィルターを適用したメモリスト
export const selectFilteredMemos = createSelector(
  [selectMemos, selectSearchQuery, selectFilters],
  (memos, searchQuery, filters) => {
    let filteredMemos = [...memos];

    // テキスト検索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredMemos = filteredMemos.filter((memo: any) =>
        memo.frontContent.toLowerCase().includes(query) ||
        memo.backContent.toLowerCase().includes(query) ||
        memo.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // タグフィルター
    if (filters.tags.length > 0) {
      filteredMemos = filteredMemos.filter((memo: any) =>
        memo.tags?.some((tag: string) => filters.tags.includes(tag))
      );
    }

    // カラーフィルター
    if (filters.colors.length > 0) {
      filteredMemos = filteredMemos.filter((memo: any) =>
        memo.color && filters.colors.includes(memo.color)
      );
    }

    // お気に入りフィルター
    if (filters.isStarred !== null) {
      filteredMemos = filteredMemos.filter((memo: any) =>
        Boolean(memo.isStarred) === filters.isStarred
      );
    }

    // 日付範囲フィルター
    if (filters.dateRange.start || filters.dateRange.end) {
      filteredMemos = filteredMemos.filter((memo: any) => {
        const memoDate = new Date(memo.createdAt);
        const start = filters.dateRange.start;
        const end = filters.dateRange.end;

        if (start && memoDate < start) return false;
        if (end && memoDate > end) return false;
        return true;
      });
    }

    return filteredMemos;
  }
);

// ソートされたメモリスト
export const selectSortedAndFilteredMemos = createSelector(
  [selectFilteredMemos, selectSortBy, selectSortOrder],
  (filteredMemos, sortBy, sortOrder) => {
    const sortedMemos = [...filteredMemos];

    sortedMemos.sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      switch (sortBy) {
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'updatedAt':
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        case 'alphabetical':
          aValue = a.frontContent.toLowerCase();
          bValue = b.frontContent.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedMemos;
  }
);

// 統計情報セレクター
export const selectMemoStats = createSelector(
  [selectMemos, selectFilteredMemos],
  (allMemos, filteredMemos) => ({
    total: allMemos.length,
    filtered: filteredMemos.length,
    starred: allMemos.filter((memo: any) => memo.isStarred).length,
    withTags: allMemos.filter((memo: any) => memo.tags && memo.tags.length > 0).length,
  })
);

// タグ統計セレクター
export const selectTagStats = createSelector(
  [selectMemos],
  (memos) => {
    const tagCounts = new Map<string, number>();
    
    memos.forEach((memo: any) => {
      memo.tags?.forEach((tag: string) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }
);

// カラー統計セレクター
export const selectColorStats = createSelector(
  [selectMemos],
  (memos) => {
    const colorCounts = new Map<string, number>();
    
    memos.forEach((memo: any) => {
      if (memo.color) {
        colorCounts.set(memo.color, (colorCounts.get(memo.color) || 0) + 1);
      }
    });

    return Array.from(colorCounts.entries())
      .map(([color, count]) => ({ color, count }))
      .sort((a, b) => b.count - a.count);
  }
);

// ページネーション用セレクター
export const selectPaginatedMemos = createSelector(
  [selectSortedAndFilteredMemos, 
   (state: RootState) => state.memos.currentPage,
   (state: RootState) => state.memos.itemsPerPage],
  (sortedMemos, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      items: sortedMemos.slice(startIndex, endIndex),
      totalItems: sortedMemos.length,
      totalPages: Math.ceil(sortedMemos.length / itemsPerPage),
      currentPage,
      itemsPerPage,
      hasNextPage: endIndex < sortedMemos.length,
      hasPrevPage: currentPage > 1,
    };
  }
);