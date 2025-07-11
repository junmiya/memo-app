import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchQuery } from '../../store/slices/uiSlice';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "メモを検索...",
  className = ""
}) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.ui.searchQuery);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  // デバウンス機能付き検索
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [localQuery, dispatch]);

  // 外部からの検索クエリ変更に対応
  useEffect(() => {
    if (searchQuery !== localQuery) {
      setLocalQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
      e.currentTarget.blur();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`relative transition-all duration-200 ${
        isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      } rounded-lg`}>
        {/* 検索アイコン */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className={`h-5 w-5 transition-colors duration-200 ${
              isFocused || localQuery ? 'text-blue-500' : 'text-gray-400'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* 検索入力フィールド */}
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white"
        />

        {/* クリアボタン */}
        {localQuery && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
              aria-label="検索をクリア"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 検索中インジケーター */}
      {localQuery !== searchQuery && localQuery && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* 検索結果カウント表示エリア（親コンポーネントで制御） */}
      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600">
          {/* このエリアは親コンポーネントから注入される */}
        </div>
      )}
    </div>
  );
};

export default SearchBar;