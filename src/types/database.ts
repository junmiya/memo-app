// Supabaseデータベースの型定義

export interface Profile {
  id: string
  username?: string
  display_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface StudyRecord {
  id: string
  user_id: string
  card_number: number
  correct_count: number
  incorrect_count: number
  last_studied: string
  difficulty_level: 'easy' | 'normal' | 'hard'
}

export interface UserSettings {
  id: string
  user_id: string
  card_order: 'sequential' | 'random' | 'difficulty'
  show_furigana: boolean
  auto_flip: boolean
  study_mode: 'practice' | 'test' | 'review'
  created_at: string
}

// APIレスポンス型
export interface SupabaseResponse<T> {
  data: T | null
  error: Error | null
}

// 学習統計用の型
export interface StudyStats {
  totalCards: number
  studiedCards: number
  totalCorrect: number
  totalIncorrect: number
  averageAccuracy: number
  studyStreak: number
  lastStudyDate: string
}

// 学習記録の作成・更新用
export interface StudyRecordInput {
  user_id: string
  card_number: number
  correct_count?: number
  incorrect_count?: number
  difficulty_level?: 'easy' | 'normal' | 'hard'
}

// プロファイル更新用
export interface ProfileUpdate {
  username?: string
  display_name?: string
  avatar_url?: string
}

// ユーザー設定更新用
export interface UserSettingsUpdate {
  card_order?: 'sequential' | 'random' | 'difficulty'
  show_furigana?: boolean
  auto_flip?: boolean
  study_mode?: 'practice' | 'test' | 'review'
}

// 認証関連の型
export interface AuthUser {
  id: string
  email?: string
  user_metadata?: any
  created_at: string
}

// セッション型
export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_in: number
  user: AuthUser
}