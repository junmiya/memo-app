import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, FilterState } from '../../types';

const initialState: UIState = {
  selectedMemoId: null,
  isEditMode: false,
  searchQuery: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  isFormOpen: false,
  filters: {
    tags: [],
    colors: [],
    isStarred: null,
    dateRange: { start: null, end: null }
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // メモ選択
    setSelectedMemo: (state, action: PayloadAction<string | null>) => {
      state.selectedMemoId = action.payload;
    },

    // 編集モード切り替え
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload;
    },

    // 検索クエリ設定
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // ソート設定
    setSortBy: (state, action: PayloadAction<UIState['sortBy']>) => {
      state.sortBy = action.payload;
    },

    // ソート順設定
    setSortOrder: (state, action: PayloadAction<UIState['sortOrder']>) => {
      state.sortOrder = action.payload;
    },

    // フォーム表示状態
    setFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
      
      // フォームを閉じる時は選択状態もクリア
      if (!action.payload) {
        state.selectedMemoId = null;
        state.isEditMode = false;
      }
    },

    // 新規作成モード
    openCreateForm: (state) => {
      state.isFormOpen = true;
      state.isEditMode = false;
      state.selectedMemoId = null;
    },

    // 編集モード
    openEditForm: (state, action: PayloadAction<string>) => {
      state.isFormOpen = true;
      state.isEditMode = true;
      state.selectedMemoId = action.payload;
    },

    // フォーム閉じる
    closeForm: (state) => {
      state.isFormOpen = false;
      state.isEditMode = false;
      state.selectedMemoId = null;
    },

    // フィルター設定
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
    },

    // フィルター部分更新
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // タグフィルター設定
    setTagFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.tags = action.payload;
    },

    // カラーフィルター設定
    setColorFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.colors = action.payload;
    },

    // お気に入りフィルター設定
    setStarredFilter: (state, action: PayloadAction<boolean | null>) => {
      state.filters.isStarred = action.payload;
    },

    // 日付範囲フィルター設定
    setDateRangeFilter: (state, action: PayloadAction<{ start: Date | null; end: Date | null }>) => {
      state.filters.dateRange = action.payload;
    },

    // フィルタークリア
    clearFilters: (state) => {
      state.filters = {
        tags: [],
        colors: [],
        isStarred: null,
        dateRange: { start: null, end: null }
      };
    },

    // UI状態リセット
    resetUI: (state) => {
      state.selectedMemoId = null;
      state.isEditMode = false;
      state.isFormOpen = false;
      state.searchQuery = '';
      state.filters = {
        tags: [],
        colors: [],
        isStarred: null,
        dateRange: { start: null, end: null }
      };
    },
  },
});

export const {
  setSelectedMemo,
  setEditMode,
  setSearchQuery,
  setSortBy,
  setSortOrder,
  setFormOpen,
  openCreateForm,
  openEditForm,
  closeForm,
  setFilters,
  updateFilters,
  setTagFilter,
  setColorFilter,
  setStarredFilter,
  setDateRangeFilter,
  clearFilters,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;