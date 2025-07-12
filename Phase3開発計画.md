# Phase 3 開発計画書

## 📋 概要
百人一首かるたアプリのSupabase統合による機能拡張

## 🎯 開発目標
- Supabase統合によるデータ永続化
- ユーザー認証システム実装
- 学習進捗記録機能
- 仮想スクロール対応（性能向上）
- リアルタイム同期機能

## 🏗️ Phase 3.1: Supabase基盤構築

### 3.1.1 プロジェクトセットアップ
- [ ] Supabaseアカウント作成・プロジェクト作成
- [ ] Vercel統合設定
- [ ] 環境変数設定

### 3.1.2 ライブラリ統合
```bash
npm install @supabase/supabase-js
npm install @supabase/auth-ui-react
npm install @supabase/auth-ui-shared
```

### 3.1.3 データベース設計
```sql
-- ユーザープロファイル
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 学習記録
CREATE TABLE study_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  card_number INTEGER NOT NULL,
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  last_studied TIMESTAMP DEFAULT NOW(),
  difficulty_level TEXT DEFAULT 'normal'
);

-- ユーザー設定
CREATE TABLE user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  card_order TEXT DEFAULT 'sequential',
  show_furigana BOOLEAN DEFAULT true,
  auto_flip BOOLEAN DEFAULT false,
  study_mode TEXT DEFAULT 'practice',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Phase 3.2: 仮想スクロール実装

### 3.2.1 パフォーマンス最適化
```bash
npm install react-window react-window-infinite-loader
npm install @types/react-window
```

### 3.2.2 実装内容
- 100首対応の仮想スクロール
- 動的ローディング機能
- スクロール位置記憶機能

## 🔐 Phase 3.3: 認証・ユーザー機能

### 3.3.1 認証システム
- メール認証
- Google OAuth
- ゲストモード

### 3.3.2 ユーザー機能
- プロフィール管理
- 学習進捗記録
- 個人設定保存

## 📊 Phase 3.4: 高度な学習機能

### 3.4.1 学習モード
- 順番練習モード
- ランダム練習モード
- 決まり字練習モード
- 苦手カード集中モード

### 3.4.2 統計・分析
- 学習時間記録
- 正答率統計
- 弱点分析
- 進捗グラフ

## 🔄 Phase 3.5: リアルタイム機能

### 3.5.1 同期機能
- デバイス間データ同期
- リアルタイム進捗更新
- オフライン対応

## 📱 技術スタック

### フロントエンド
- React + TypeScript
- Redux Toolkit（状態管理）
- Tailwind CSS（スタイリング）
- React Window（仮想スクロール）

### バックエンド
- Supabase（BaaS）
- PostgreSQL（データベース）
- Row Level Security（セキュリティ）

### デプロイ
- Vercel（フロントエンド）
- Supabase（バックエンド）

## 🗓️ 開発スケジュール

### Week 1-2: 基盤構築
- Supabaseセットアップ
- 認証システム実装
- 基本データベース操作

### Week 3-4: 仮想スクロール
- パフォーマンス最適化
- UI/UX改善

### Week 5-6: 学習機能
- 進捗記録システム
- 統計・分析機能

### Week 7-8: 最終調整
- テスト・デバッグ
- ドキュメント更新
- プロダクションデプロイ

## 🎯 成功指標
- [ ] 100首すべての快適な表示
- [ ] ユーザー認証機能完動
- [ ] 学習進捗の正確な記録
- [ ] モバイル・デスクトップ両対応
- [ ] オフライン機能対応

## 🔒 セキュリティ考慮事項
- Row Level Security（RLS）設定
- API Key管理
- ユーザーデータ保護
- GDPR準拠

## 📈 将来の拡張計画
- 競技かるた対応機能
- マルチプレイヤー対戦
- AI音声読み上げ
- コミュニティ機能