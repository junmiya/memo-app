import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectSortedAndFilteredMemos, selectMemoStats } from '../../utils/selectors';
import { Memo } from '../../types';
import MemoCard from './MemoCard';
import EmptyState from '../layout/EmptyState';

interface MemoGridProps {
  onEditMemo: (memo: Memo) => void;
  onDeleteMemo: (id: string) => void;
  onCreateMemo: () => void;
  isLoading?: boolean;
}

const MemoGrid: React.FC<MemoGridProps> = ({
  onEditMemo,
  onDeleteMemo,
  onCreateMemo,
  isLoading = false,
}) => {
  // セレクターでフィルター済みメモを取得
  const memos = useAppSelector(selectSortedAndFilteredMemos);
  const stats = useAppSelector(selectMemoStats);
  const searchQuery = useAppSelector(state => state.ui.searchQuery);
  const filters = useAppSelector(state => state.ui.filters);

  // フィルター状態の確認
  const hasActiveFilters = filters.tags.length > 0 || 
                          filters.colors.length > 0 || 
                          filters.isStarred !== null ||
                          filters.dateRange.start !== null;
  const hasActiveSearch = searchQuery.trim().length > 0;
  // ローディング状態
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* スケルトンローダー */}
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // 空状態
  if (memos.length === 0) {
    // フィルター適用で結果が0件の場合
    if ((hasActiveSearch || hasActiveFilters) && stats.total > 0) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            title="検索結果が見つかりません"
            description="検索条件やフィルターを変更してお試しください"
            actionLabel="フィルターをクリア"
            onAction={() => {
              // フィルタークリア処理はSearchHeaderで実装
            }}
            icon={
              <div className="w-16 h-16 mx-auto mb-4">
                <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            }
          />
        </div>
      );
    }

    // 本当にメモが0件の場合
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          title="カードがありません"
          description="最初のカードを作成して、単語を覚えましょう"
          actionLabel="新しいカードを作成"
          onAction={onCreateMemo}
          icon={
            <div className="w-16 h-16 mx-auto mb-4">
              <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* メモ統計情報 */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            カード一覧 ({memos.length}件)
            {(hasActiveSearch || hasActiveFilters) && stats.total !== memos.length && (
              <span className="text-sm text-gray-500 font-normal ml-2">
                / 全{stats.total}件
              </span>
            )}
          </h2>
          
          {/* フィルター状態表示 */}
          {(hasActiveSearch || hasActiveFilters) && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>フィルター適用中</span>
            </div>
          )}
        </div>
      </div>

      {/* メモグリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {memos.map((memo) => (
          <MemoCard
            key={memo.id}
            memo={memo}
            onEdit={onEditMemo}
            onDelete={onDeleteMemo}
          />
        ))}
      </div>

      {/* ページネーション（Phase 2で実装） */}
      <div className="mt-8 flex justify-center">
        {/* ページネーションコンポーネントエリア */}
      </div>
    </div>
  );
};

export default MemoGrid;