import React, { useState } from 'react';
import { Memo } from '../../types';
import { formatRelativeTime } from '../../utils/memo';

interface MemoCardProps {
  memo: Memo;
  onEdit: (memo: Memo) => void;
  onDelete: (id: string) => void;
}

const MemoCard: React.FC<MemoCardProps> = ({ memo, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(memo);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('このカードを削除しますか？')) {
      onDelete(memo.id);
    }
  };

  const getCardColorClasses = (color: string = 'blue') => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600', 
      yellow: 'from-yellow-400 to-yellow-500',
      pink: 'from-pink-500 to-pink-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      red: 'from-red-500 to-red-600',
      gray: 'from-gray-500 to-gray-600',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const frontColorClasses = getCardColorClasses(memo.color);
  const backColorClasses = getCardColorClasses(memo.color);

  return (
    <div className="memo-card-container perspective-1000 h-48 cursor-pointer group">
      <div
        className={`memo-card relative w-full h-full transform-style-preserve-3d transition-transform duration-600 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* 表面 */}
        <div className={`card-face absolute w-full h-full backface-hidden bg-gradient-to-br ${frontColorClasses} rounded-lg p-4 flex flex-col text-white shadow-lg hover:shadow-xl transition-shadow`}>
          {/* 星マーク */}
          {memo.isStarred && (
            <div className="absolute top-4 right-4">
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
          
          {/* 表面コンテンツ - 中央配置・大きなフォント */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-4xl font-bold text-center leading-tight">
              {memo.frontContent ? memo.frontContent : 'English'}
            </div>
          </div>

          {/* メタ情報と操作ボタン */}
          <div className="mt-3">
            <div className="text-xs opacity-75 mb-2">
              {formatRelativeTime(memo.updatedAt)}
            </div>
            <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-1">
                <button
                  onClick={handleEditClick}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                >
                  編集
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                >
                  削除
                </button>
              </div>
              {memo.tags && memo.tags.length > 0 && (
                <div className="flex space-x-1">
                  {memo.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="text-xs bg-white/20 px-1 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 裏面 */}
        <div className={`card-face absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br ${backColorClasses} rounded-lg p-4 flex flex-col text-white shadow-lg`}>
          {/* 裏面コンテンツ - 中央配置・大きなフォント */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-3xl font-bold text-center leading-tight">
              {memo.backContent ? memo.backContent : '日本語'}
            </div>
          </div>

          {/* メタ情報と操作ボタン */}
          <div className="mt-3">
            <div className="text-xs opacity-75 mb-2">
              作成: {formatRelativeTime(memo.createdAt)}
            </div>
            <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-1">
                <button
                  onClick={handleEditClick}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                >
                  編集
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                >
                  削除
                </button>
              </div>
              <div className="text-xs opacity-75">
                裏面
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoCard;