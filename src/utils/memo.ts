import { v4 as uuidv4 } from 'uuid';
import { Memo, CreateMemoData, MEMO_COLORS, MemoColor } from '../types';

/**
 * 新しいメモを作成
 */
export const createMemo = (data: CreateMemoData): Memo => {
  const now = new Date();
  
  return {
    id: uuidv4(),
    frontContent: data.frontContent.trim(),
    backContent: data.backContent.trim(),
    createdAt: now,
    updatedAt: now,
    tags: data.tags || [],
    color: data.color || 'blue',
    isStarred: data.isStarred || false,
  };
};

/**
 * メモを更新
 */
export const updateMemo = (existingMemo: Memo, updates: Partial<CreateMemoData>): Memo => {
  return {
    ...existingMemo,
    ...updates,
    updatedAt: new Date(),
    frontContent: updates.frontContent?.trim() ?? existingMemo.frontContent,
    backContent: updates.backContent?.trim() ?? existingMemo.backContent,
  };
};

/**
 * メモが空かどうかチェック
 */
export const isEmpty = (memo: Partial<Memo>): boolean => {
  return !memo.frontContent?.trim() && !memo.backContent?.trim();
};

/**
 * メモの検索
 */
export const searchMemos = (memos: Memo[], query: string): Memo[] => {
  if (!query.trim()) return memos;
  
  const searchTerm = query.toLowerCase();
  return memos.filter(memo =>
    memo.frontContent.toLowerCase().includes(searchTerm) ||
    memo.backContent.toLowerCase().includes(searchTerm) ||
    memo.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

/**
 * メモのソート
 */
export const sortMemos = (
  memos: Memo[], 
  sortBy: 'createdAt' | 'updatedAt' | 'alphabetical',
  order: 'asc' | 'desc' = 'desc'
): Memo[] => {
  return [...memos].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'updatedAt':
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case 'alphabetical':
        comparison = a.frontContent.localeCompare(b.frontContent, 'ja');
        break;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
};

/**
 * ランダムな色を選択
 */
export const getRandomColor = (): MemoColor => {
  return MEMO_COLORS[Math.floor(Math.random() * MEMO_COLORS.length)];
};

/**
 * 日付のフォーマット
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * 相対時間の表示
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'たった今';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}分前`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}時間前`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}日前`;
  } else {
    return formatDate(date);
  }
};

/**
 * テキストの切り詰め
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * メモの統計情報
 */
export const getMemoStats = (memos: Memo[]) => {
  const totalMemos = memos.length;
  const starredMemos = memos.filter(memo => memo.isStarred).length;
  const totalCharacters = memos.reduce((sum, memo) => 
    sum + memo.frontContent.length + memo.backContent.length, 0
  );
  
  const colorStats = MEMO_COLORS.reduce((stats, color) => {
    stats[color] = memos.filter(memo => memo.color === color).length;
    return stats;
  }, {} as Record<MemoColor, number>);
  
  return {
    totalMemos,
    starredMemos,
    totalCharacters,
    colorStats,
  };
};