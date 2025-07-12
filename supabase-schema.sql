-- Supabaseデータベーススキーマ
-- 百人一首かるたアプリ用

-- プロファイルテーブル
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- プロファイルのRLS（Row Level Security）設定
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- プロファイルのポリシー
CREATE POLICY "プロファイルは自分のもののみ閲覧可能" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "プロファイルは自分のもののみ更新可能" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "プロファイルは自分のもののみ挿入可能" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 学習記録テーブル
CREATE TABLE IF NOT EXISTS study_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  card_number INTEGER NOT NULL CHECK (card_number >= 1 AND card_number <= 100),
  correct_count INTEGER DEFAULT 0 CHECK (correct_count >= 0),
  incorrect_count INTEGER DEFAULT 0 CHECK (incorrect_count >= 0),
  last_studied TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  difficulty_level TEXT DEFAULT 'normal' CHECK (difficulty_level IN ('easy', 'normal', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- ユーザーごと・カードごとのユニーク制約
  UNIQUE(user_id, card_number)
);

-- 学習記録のRLS設定
ALTER TABLE study_records ENABLE ROW LEVEL SECURITY;

-- 学習記録のポリシー
CREATE POLICY "学習記録は自分のもののみ閲覧可能" ON study_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "学習記録は自分のもののみ操作可能" ON study_records
  FOR ALL USING (auth.uid() = user_id);

-- ユーザー設定テーブル
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  card_order TEXT DEFAULT 'sequential' CHECK (card_order IN ('sequential', 'random', 'difficulty')),
  show_furigana BOOLEAN DEFAULT true,
  auto_flip BOOLEAN DEFAULT false,
  study_mode TEXT DEFAULT 'practice' CHECK (study_mode IN ('practice', 'test', 'review')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ユーザー設定のRLS設定
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- ユーザー設定のポリシー
CREATE POLICY "設定は自分のもののみ閲覧可能" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "設定は自分のもののみ操作可能" ON user_settings
  FOR ALL USING (auth.uid() = user_id);

-- インデックス作成（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_study_records_user_id ON study_records(user_id);
CREATE INDEX IF NOT EXISTS idx_study_records_card_number ON study_records(card_number);
CREATE INDEX IF NOT EXISTS idx_study_records_last_studied ON study_records(last_studied);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- トリガー関数（updated_atの自動更新）
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_atトリガー設定
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_records_updated_at 
  BEFORE UPDATE ON study_records 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at 
  BEFORE UPDATE ON user_settings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 新規ユーザー登録時にプロファイルとデフォルト設定を自動作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- プロファイル作成
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  
  -- デフォルト設定作成
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 新規ユーザートリガー
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 学習統計を取得するビュー
CREATE OR REPLACE VIEW user_study_stats AS
SELECT 
  user_id,
  COUNT(*) as total_studied_cards,
  SUM(correct_count) as total_correct,
  SUM(incorrect_count) as total_incorrect,
  CASE 
    WHEN SUM(correct_count + incorrect_count) > 0 
    THEN ROUND((SUM(correct_count)::FLOAT / SUM(correct_count + incorrect_count)) * 100, 2)
    ELSE 0 
  END as accuracy_percentage,
  MAX(last_studied) as last_study_date
FROM study_records 
GROUP BY user_id;

-- 学習統計ビューのRLS
ALTER VIEW user_study_stats SET (security_invoker = on);

-- 関数：カード別の学習進捗取得
CREATE OR REPLACE FUNCTION get_card_progress(p_user_id UUID)
RETURNS TABLE (
  card_number INTEGER,
  correct_count INTEGER,
  incorrect_count INTEGER,
  accuracy FLOAT,
  last_studied TIMESTAMP WITH TIME ZONE,
  difficulty_level TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sr.card_number,
    sr.correct_count,
    sr.incorrect_count,
    CASE 
      WHEN (sr.correct_count + sr.incorrect_count) > 0 
      THEN (sr.correct_count::FLOAT / (sr.correct_count + sr.incorrect_count)) * 100
      ELSE 0 
    END as accuracy,
    sr.last_studied,
    sr.difficulty_level
  FROM study_records sr
  WHERE sr.user_id = p_user_id
  ORDER BY sr.card_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- サンプルデータ（開発用）
-- INSERT INTO profiles (id, username, display_name) VALUES 
--   ('00000000-0000-0000-0000-000000000000', 'test_user', 'テストユーザー');

-- INSERT INTO user_settings (user_id) VALUES 
--   ('00000000-0000-0000-0000-000000000000');

-- コメント
COMMENT ON TABLE profiles IS 'ユーザープロファイル情報';
COMMENT ON TABLE study_records IS 'カード別学習記録';
COMMENT ON TABLE user_settings IS 'ユーザー個別設定';
COMMENT ON VIEW user_study_stats IS 'ユーザー学習統計サマリー';