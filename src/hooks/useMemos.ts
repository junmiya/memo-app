import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  addMemo,
  updateMemo,
  deleteMemo,
  setMemos,
  setLoading,
  setError,
  selectFilteredAndSortedMemos,
  selectSelectedMemo,
  selectIsLoading,
  selectMemosError,
} from '../store';
import { openCreateForm, openEditForm, closeForm } from '../store/slices/uiSlice';
import { LocalStorageManager } from '../utils/localStorage';
import { createMemo as createMemoUtil, updateMemo as updateMemoUtil } from '../utils/memo';
import { Memo, CreateMemoData } from '../types';

/**
 * メモ操作のカスタムhook
 */
export const useMemos = () => {
  const dispatch = useAppDispatch();
  
  // セレクター
  const memos = useAppSelector(selectFilteredAndSortedMemos);
  const selectedMemo = useAppSelector(selectSelectedMemo);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectMemosError);

  // 初期データロード
  const loadMemos = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const savedMemos = LocalStorageManager.load();
      dispatch(setMemos(savedMemos));
    } catch (error) {
      dispatch(setError('メモの読み込みに失敗しました'));
      console.error('Failed to load memos:', error);
    }
  }, [dispatch]);

  // メモ作成
  const createMemo = useCallback(async (data: CreateMemoData) => {
    try {
      const newMemo = createMemoUtil(data);
      dispatch(addMemo(newMemo));
      return newMemo;
    } catch (error) {
      dispatch(setError('メモの作成に失敗しました'));
      console.error('Failed to create memo:', error);
      throw error;
    }
  }, [dispatch]);

  // メモ更新
  const editMemo = useCallback(async (_memoId: string, updates: Partial<CreateMemoData>) => {
    try {
      const currentMemo = selectedMemo;
      if (!currentMemo) {
        throw new Error('メモが見つかりません');
      }
      
      const updatedMemo = updateMemoUtil(currentMemo, updates);
      dispatch(updateMemo(updatedMemo));
      return updatedMemo;
    } catch (error) {
      dispatch(setError('メモの更新に失敗しました'));
      console.error('Failed to update memo:', error);
      throw error;
    }
  }, [dispatch, selectedMemo]);

  // メモ削除
  const removeMemo = useCallback(async (id: string) => {
    try {
      dispatch(deleteMemo(id));
    } catch (error) {
      dispatch(setError('メモの削除に失敗しました'));
      console.error('Failed to delete memo:', error);
      throw error;
    }
  }, [dispatch]);

  // UI操作
  const openCreate = useCallback(() => {
    dispatch(openCreateForm());
  }, [dispatch]);

  const openEdit = useCallback((memo: Memo) => {
    dispatch(openEditForm(memo.id));
  }, [dispatch]);

  const closeFormModal = useCallback(() => {
    dispatch(closeForm());
  }, [dispatch]);

  // 初期化
  useEffect(() => {
    loadMemos();
  }, [loadMemos]);

  return {
    // データ
    memos,
    selectedMemo,
    isLoading,
    error,
    
    // 操作
    createMemo,
    editMemo,
    removeMemo,
    
    // UI操作
    openCreate,
    openEdit,
    closeFormModal,
    
    // ユーティリティ
    loadMemos,
  };
};