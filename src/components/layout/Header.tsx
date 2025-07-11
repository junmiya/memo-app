import React from 'react';
import Button from '../ui/Button';

interface HeaderProps {
  onCreateMemo: () => void;
  memoCount?: number;
}

const Header: React.FC<HeaderProps> = ({ onCreateMemo, memoCount = 0 }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴとタイトル */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">🎴</span>
              かるたカード
            </h1>
            {memoCount > 0 && (
              <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {memoCount}件
              </span>
            )}
          </div>

          {/* 操作ボタン */}
          <div className="flex items-center space-x-4">
            <Button onClick={onCreateMemo} variant="primary" size="md">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              新しいカード
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;