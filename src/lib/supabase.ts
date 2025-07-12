import { createClient } from '@supabase/supabase-js'

// Supabase設定（環境変数から取得）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Supabaseクライアントを作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// 認証関連のヘルパー関数
export const auth = {
  // サインアップ
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    })
  },

  // サインイン
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  },

  // Google OAuth
  signInWithGoogle: async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  },

  // サインアウト
  signOut: async () => {
    return await supabase.auth.signOut()
  },

  // 現在のユーザー取得
  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  // セッション取得
  getSession: () => {
    return supabase.auth.getSession()
  }
}

// データベース操作用のヘルパー関数
export const db = {
  // プロファイル関連
  profiles: {
    get: async (userId: string) => {
      return await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    },
    
    create: async (profile: any) => {
      return await supabase
        .from('profiles')
        .insert(profile)
    },
    
    update: async (userId: string, updates: any) => {
      return await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
    }
  },

  // 学習記録関連
  studyRecords: {
    getByUser: async (userId: string) => {
      return await supabase
        .from('study_records')
        .select('*')
        .eq('user_id', userId)
        .order('last_studied', { ascending: false })
    },
    
    getByCard: async (userId: string, cardNumber: number) => {
      return await supabase
        .from('study_records')
        .select('*')
        .eq('user_id', userId)
        .eq('card_number', cardNumber)
        .single()
    },
    
    upsert: async (record: any) => {
      return await supabase
        .from('study_records')
        .upsert(record, {
          onConflict: 'user_id,card_number'
        })
    }
  },

  // ユーザー設定関連
  userSettings: {
    get: async (userId: string) => {
      return await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single()
    },
    
    upsert: async (settings: any) => {
      return await supabase
        .from('user_settings')
        .upsert(settings, {
          onConflict: 'user_id'
        })
    }
  }
}

// リアルタイム購読用のヘルパー
export const realtime = {
  // 学習記録の変更を購読
  subscribeToStudyRecords: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('study_records')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'study_records',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
}

export default supabase