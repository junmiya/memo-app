import { Middleware } from '@reduxjs/toolkit';

const STORAGE_KEY = 'memo-app-data';

// ローカルストレージ操作のユーティリティ
const localStorageUtils = {
  save: (data: any) => {
    try {
      const serializedData = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedData));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  load: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};

// ローカルストレージミドルウェア
export const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  
  // メモ関連のアクションの場合、ローカルストレージに保存
  if (action.type.startsWith('memos/')) {
    const state = store.getState();
    const memosToSave = state.memos.items.map((memo: any) => ({
      ...memo,
      // Dateオブジェクトを文字列に変換
      createdAt: memo.createdAt instanceof Date ? memo.createdAt.toISOString() : memo.createdAt,
      updatedAt: memo.updatedAt instanceof Date ? memo.updatedAt.toISOString() : memo.updatedAt,
    }));
    
    localStorageUtils.save({
      memos: memosToSave,
      totalCount: state.memos.totalCount,
    });
  }
  
  return result;
};

export { localStorageUtils };