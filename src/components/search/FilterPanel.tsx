import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { MEMO_COLORS } from '../../types';
import { setFilters } from '../../store/slices/uiSlice';
import Button from '../ui/Button';

interface FilterPanelProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface FilterState {
  tags: string[];
  colors: string[];
  isStarred: boolean | null;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  className = "",
  isCollapsed = false,
  onToggleCollapse
}) => {
  const dispatch = useAppDispatch();
  const memos = useAppSelector(state => state.memos.items);
  const currentFilters = useAppSelector(state => state.ui.filters);
  
  // ローカルフィルター状態（Reduxの状態で初期化）
  const [filters, setLocalFilters] = useState<FilterState>(currentFilters);

  // 利用可能なタグを取得
  const availableTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    memos.forEach(memo => {
      memo.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [memos]);

  // 利用可能な色を取得
  const availableColors = React.useMemo(() => {
    const colorSet = new Set<string>();
    memos.forEach(memo => {
      if (memo.color) colorSet.add(memo.color);
    });
    return MEMO_COLORS.filter(color => colorSet.has(color));
  }, [memos]);

  const handleTagToggle = (tag: string) => {
    setLocalFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleColorToggle = (color: string) => {
    setLocalFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleStarredToggle = (starred: boolean | null) => {
    setLocalFilters(prev => ({
      ...prev,
      isStarred: prev.isStarred === starred ? null : starred
    }));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      tags: [],
      colors: [],
      isStarred: null,
      dateRange: { start: null, end: null }
    };
    setLocalFilters(clearedFilters);
    dispatch(setFilters(clearedFilters));
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(filters));
  };

  const hasActiveFilters = filters.tags.length > 0 || 
                          filters.colors.length > 0 || 
                          filters.isStarred !== null ||
                          filters.dateRange.start !== null;

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500 border-blue-500',
      green: 'bg-green-500 border-green-500',
      yellow: 'bg-yellow-400 border-yellow-400',
      pink: 'bg-pink-500 border-pink-500',
      purple: 'bg-purple-500 border-purple-500',
      indigo: 'bg-indigo-500 border-indigo-500',
      red: 'bg-red-500 border-red-500',
      gray: 'bg-gray-500 border-gray-500',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  if (isCollapsed) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">フィルター</span>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                アクティブ
              </span>
            )}
          </div>
          {onToggleCollapse && (
            <Button variant="ghost" size="sm" onClick={onToggleCollapse}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">フィルター</h3>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              クリア
            </Button>
          )}
          {onToggleCollapse && (
            <Button variant="ghost" size="sm" onClick={onToggleCollapse}>
              <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* お気に入りフィルター */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">お気に入り</h4>
          <div className="flex space-x-2">
            <button
              onClick={() => handleStarredToggle(true)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.isStarred === true
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⭐ お気に入りのみ
            </button>
            <button
              onClick={() => handleStarredToggle(false)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.isStarred === false
                  ? 'bg-gray-100 text-gray-800 border border-gray-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              通常のみ
            </button>
          </div>
        </div>

        {/* カラーフィルター */}
        {availableColors.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              カラー ({filters.colors.length}/{availableColors.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {availableColors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    filters.colors.includes(color)
                      ? `${getColorClasses(color)} ring-2 ring-offset-2 ring-blue-500`
                      : `${getColorClasses(color)} hover:scale-110`
                  }`}
                  title={`${color}色`}
                  aria-label={`${color}色でフィルター`}
                />
              ))}
            </div>
          </div>
        )}

        {/* タグフィルター */}
        {availableTags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              タグ ({filters.tags.length}/{availableTags.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 適用ボタン */}
        <div className="pt-4 border-t">
          <Button 
            variant="primary" 
            size="md" 
            className="w-full"
            onClick={handleApplyFilters}
          >
            フィルターを適用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;