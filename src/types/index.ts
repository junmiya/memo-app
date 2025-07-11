export type {
  Memo,
  MemoState,
  UIState,
  FilterState,
  SettingsState,
  MemoFormData,
  CreateMemoData,
  UpdateMemoData,
  MemoColor
} from './memo';

export { MEMO_COLORS } from './memo';

// React関連の共通型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// イベントハンドラー型
export interface MemoEventHandlers {
  onEdit: (memo: import('./memo').Memo) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

// ページネーション関連
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}