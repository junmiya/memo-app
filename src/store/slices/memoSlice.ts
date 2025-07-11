import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Memo, MemoState } from '../../types';

const initialState: MemoState = {
  items: [],
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 12,
  isLoading: false,
  error: null,
};

const memoSlice = createSlice({
  name: 'memos',
  initialState,
  reducers: {
    // メモ追加
    addMemo: (state, action: PayloadAction<Memo>) => {
      state.items.unshift(action.payload);
      state.totalCount += 1;
      state.error = null;
    },

    // メモ更新
    updateMemo: (state, action: PayloadAction<Memo>) => {
      const index = state.items.findIndex(memo => memo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.error = null;
      }
    },

    // メモ削除
    deleteMemo: (state, action: PayloadAction<string>) => {
      const initialLength = state.items.length;
      state.items = state.items.filter(memo => memo.id !== action.payload);
      
      if (state.items.length < initialLength) {
        state.totalCount -= 1;
        state.error = null;
      }
    },

    // メモ一覧設定（初期ロード時など）
    setMemos: (state, action: PayloadAction<Memo[]>) => {
      state.items = action.payload;
      state.totalCount = action.payload.length;
      state.isLoading = false;
      state.error = null;
    },

    // ローディング状態設定
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // エラー設定
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // ページ変更
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = Math.max(1, action.payload);
    },

    // ページサイズ変更
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = Math.max(1, action.payload);
      state.currentPage = 1; // ページサイズ変更時は最初のページに戻る
    },

    // 全メモクリア
    clearAllMemos: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.error = null;
    },
  },
});

export const {
  addMemo,
  updateMemo,
  deleteMemo,
  setMemos,
  setLoading,
  setError,
  setCurrentPage,
  setItemsPerPage,
  clearAllMemos,
} = memoSlice.actions;

export default memoSlice.reducer;