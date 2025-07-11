import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectMemoStats } from '../../utils/selectors';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import SortControl from '../ui/SortControl';

interface SearchHeaderProps {
  className?: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ className = "" }) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const stats = useAppSelector(selectMemoStats);
  const searchQuery = useAppSelector(state => state.ui.searchQuery);
  const filters = useAppSelector(state => state.ui.filters);

  // アクティブなフィルターがあるかチェック
  const hasActiveFilters = filters.tags.length > 0 || 
                          filters.colors.length > 0 || 
                          filters.isStarred !== null ||
                          filters.dateRange.start !== null;

  const hasActiveSearch = searchQuery.trim().length > 0;

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* メイン検索エリア */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
          {/* 検索バー */}
          <div className="flex-1 max-w-md">
            <SearchBar placeholder="メモを検索..." />
          </div>

          {/* ソート＆フィルターコントロール */}
          <div className="flex items-center gap-3">
            {/* ソートコントロール */}
            <SortControl showLabel={false} />

            {/* フィルター切り替えボタン */}
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                hasActiveFilters || isFilterExpanded
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>フィルター</span>
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  ON
                </span>
              )}
              <svg 
                className={`w-4 h-4 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 検索統計 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>
              全 <span className="font-semibold text-gray-900">{stats.total}</span> 件
            </span>
            {(hasActiveSearch || hasActiveFilters) && stats.filtered !== stats.total && (
              <>
                <span className="text-gray-400">|</span>
                <span>
                  表示中 <span className="font-semibold text-blue-600">{stats.filtered}</span> 件
                </span>
              </>
            )}
            {stats.starred > 0 && (
              <>
                <span className="text-gray-400">|</span>
                <span className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{stats.starred} 件</span>
                </span>
              </>
            )}
          </div>

          {/* アクティブな検索・フィルター表示 */}
          {(hasActiveSearch || hasActiveFilters) && (
            <div className="flex flex-wrap items-center gap-2">
              {hasActiveSearch && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  検索: &quot;{searchQuery}&quot;
                </span>
              )}
              {filters.tags.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  タグ: {filters.tags.length}件
                </span>
              )}
              {filters.colors.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  カラー: {filters.colors.length}件
                </span>
              )}
              {filters.isStarred !== null && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  {filters.isStarred ? 'お気に入りのみ' : '通常のみ'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* フィルターパネル */}
        {isFilterExpanded && (
          <div className="mt-4">
            <FilterPanel 
              isCollapsed={false}
              onToggleCollapse={() => setIsFilterExpanded(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;