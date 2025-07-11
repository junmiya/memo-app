import { configureStore } from '@reduxjs/toolkit';
import memoReducer from './slices/memoSlice';
import uiReducer from './slices/uiSlice';
import { localStorageMiddleware } from './middleware/localStorage';

// Export actions from slices
export {
  addMemo,
  updateMemo,
  deleteMemo,
  setMemos,
  setLoading,
  setError,
  setCurrentPage,
  setItemsPerPage,
  clearAllMemos,
} from './slices/memoSlice';

export {
  setSelectedMemo,
  setEditMode,
  setSearchQuery,
  setSortBy,
  setSortOrder,
  setFormOpen,
  openCreateForm,
  openEditForm,
  closeForm,
  resetUI,
} from './slices/uiSlice';

// 型定義を先に
export interface RootState {
  memos: ReturnType<typeof memoReducer>;
  ui: ReturnType<typeof uiReducer>;
}

export const store = configureStore({
  reducer: {
    memos: memoReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Date オブジェクトのシリアライズチェックを無効化
        ignoredActions: ['memos/addMemo', 'memos/updateMemo', 'memos/setMemos'],
        ignoredPaths: ['memos.items'],
      },
    }).concat(localStorageMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

// 型安全なセレクター
export const selectMemos = (state: RootState) => state.memos.items;
export const selectMemosCount = (state: RootState) => state.memos.totalCount;
export const selectCurrentPage = (state: RootState) => state.memos.currentPage;
export const selectItemsPerPage = (state: RootState) => state.memos.itemsPerPage;
export const selectIsLoading = (state: RootState) => state.memos.isLoading;
export const selectMemosError = (state: RootState) => state.memos.error;

export const selectSelectedMemoId = (state: RootState) => state.ui.selectedMemoId;
export const selectIsEditMode = (state: RootState) => state.ui.isEditMode;
export const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
export const selectSortBy = (state: RootState) => state.ui.sortBy;
export const selectSortOrder = (state: RootState) => state.ui.sortOrder;
export const selectIsFormOpen = (state: RootState) => state.ui.isFormOpen;

// 計算されたセレクター
export const selectFilteredAndSortedMemos = (state: RootState) => {
  const memos = selectMemos(state);
  const searchQuery = selectSearchQuery(state);
  const sortBy = selectSortBy(state);
  const sortOrder = selectSortOrder(state);

  // 検索フィルタリング
  let filteredMemos = memos;
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredMemos = memos.filter((memo: any) =>
      memo.frontContent.toLowerCase().includes(query) ||
      memo.backContent.toLowerCase().includes(query) ||
      memo.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    );
  }

  // ソート
  const sortedMemos = [...filteredMemos].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'updatedAt':
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case 'alphabetical':
        comparison = a.frontContent.localeCompare(b.frontContent);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sortedMemos;
};

export const selectSelectedMemo = (state: RootState) => {
  const selectedId = selectSelectedMemoId(state);
  return selectedId ? selectMemos(state).find((memo: any) => memo.id === selectedId) : null;
};