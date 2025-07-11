export interface Memo {
  id: string;
  frontContent: string;
  backContent: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  color?: string;
  isStarred?: boolean;
}

export interface MemoState {
  items: Memo[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  error: string | null;
}

export interface FilterState {
  tags: string[];
  colors: string[];
  isStarred: boolean | null;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

export interface UIState {
  selectedMemoId: string | null;
  isEditMode: boolean;
  searchQuery: string;
  sortBy: 'createdAt' | 'updatedAt' | 'alphabetical';
  sortOrder: 'asc' | 'desc';
  isFormOpen: boolean;
  filters: FilterState;
}

export interface SettingsState {
  storageType: 'localStorage' | 'firebase' | 'api';
  itemsPerPage: number;
  theme: 'light' | 'dark';
}

// フォーム関連の型
export interface MemoFormData {
  frontContent: string;
  backContent: string;
  color?: string;
  tags?: string[];
}

// 作成時の型（IDなど自動生成される項目を除く）
export type CreateMemoData = Omit<Memo, 'id' | 'createdAt' | 'updatedAt'>;

// 更新時の型（IDは必須、その他は部分的）
export type UpdateMemoData = { id: string } & Partial<Omit<Memo, 'id' | 'createdAt'>>;

// カラーパレット
export const MEMO_COLORS = [
  'blue',
  'green', 
  'yellow',
  'pink',
  'purple',
  'indigo',
  'red',
  'gray'
] as const;

export type MemoColor = typeof MEMO_COLORS[number];