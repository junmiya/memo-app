import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSortBy, setSortOrder } from '../../store/slices/uiSlice';
import { UIState } from '../../types';

interface SortControlProps {
  className?: string;
  showLabel?: boolean;
}

const SortControl: React.FC<SortControlProps> = ({ 
  className = "",
  showLabel = true 
}) => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(state => state.ui.sortBy);
  const sortOrder = useAppSelector(state => state.ui.sortOrder);

  const sortOptions: Array<{
    value: UIState['sortBy'];
    label: string;
    icon: string;
  }> = [
    { value: 'createdAt', label: '作成日', icon: '📅' },
    { value: 'updatedAt', label: '更新日', icon: '🔄' },
    { value: 'alphabetical', label: 'アルファベット順', icon: '🔤' },
  ];

  const handleSortByChange = (newSortBy: UIState['sortBy']) => {
    dispatch(setSortBy(newSortBy));
  };

  const handleSortOrderToggle = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? `${option.icon} ${option.label}` : '';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-gray-700">
          並び順:
        </span>
      )}
      
      {/* ソート方法選択 */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => handleSortByChange(e.target.value as UIState['sortBy'])}
          className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* ソート順切り替えボタン */}
      <button
        onClick={handleSortOrderToggle}
        className={`p-2 rounded-md border transition-colors ${
          sortOrder === 'asc'
            ? 'bg-blue-50 border-blue-300 text-blue-700'
            : 'bg-gray-50 border-gray-300 text-gray-700'
        } hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        title={sortOrder === 'asc' ? '昇順（小→大）' : '降順（大→小）'}
        aria-label={`並び順を${sortOrder === 'asc' ? '降順' : '昇順'}に変更`}
      >
        {sortOrder === 'asc' ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          </svg>
        )}
      </button>

      {/* 現在のソート情報表示 */}
      <div className="hidden sm:flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
        <span className="mr-1">{getCurrentSortLabel()}</span>
        <span className="text-gray-400">
          {sortOrder === 'asc' ? '↑' : '↓'}
        </span>
      </div>
    </div>
  );
};

export default SortControl;