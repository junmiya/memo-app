import { useState, useEffect } from 'react'
import { useAuth } from '../components/auth/AuthProvider'
import { db } from '../lib/supabase'
import { StudyRecord, UserSettings, StudyStats } from '../types/database'

// 学習記録フック
export function useStudyRecords() {
  const { user } = useAuth()
  const [records, setRecords] = useState<StudyRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 学習記録を取得
  const fetchRecords = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await db.studyRecords.getByUser(user.id)
      if (error) throw error
      setRecords(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '学習記録の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  // 学習記録を保存/更新
  const updateRecord = async (cardNumber: number, isCorrect: boolean) => {
    if (!user) return

    try {
      // 既存の記録を取得
      const { data: existingRecord } = await db.studyRecords.getByCard(user.id, cardNumber)
      
      const recordData = {
        user_id: user.id,
        card_number: cardNumber,
        correct_count: existingRecord ? existingRecord.correct_count + (isCorrect ? 1 : 0) : (isCorrect ? 1 : 0),
        incorrect_count: existingRecord ? existingRecord.incorrect_count + (isCorrect ? 0 : 1) : (isCorrect ? 0 : 1),
        last_studied: new Date().toISOString(),
        difficulty_level: 'normal' as const
      }

      const { error } = await db.studyRecords.upsert(recordData)
      if (error) throw error

      // ローカル状態を更新
      await fetchRecords()
    } catch (err) {
      setError(err instanceof Error ? err.message : '学習記録の保存に失敗しました')
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [user])

  return {
    records,
    loading,
    error,
    updateRecord,
    refetch: fetchRecords
  }
}

// ユーザー設定フック
export function useUserSettings() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 設定を取得
  const fetchSettings = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await db.userSettings.get(user.id)
      if (error) throw error
      setSettings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '設定の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  // 設定を更新
  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return

    try {
      const settingsData = {
        user_id: user.id,
        ...updates
      }

      const { error } = await db.userSettings.upsert(settingsData)
      if (error) throw error

      // ローカル状態を更新
      await fetchSettings()
    } catch (err) {
      setError(err instanceof Error ? err.message : '設定の保存に失敗しました')
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [user])

  return {
    settings,
    loading,
    error,
    updateSettings,
    refetch: fetchSettings
  }
}

// 学習統計フック
export function useStudyStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState<StudyStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data: records, error } = await db.studyRecords.getByUser(user.id)
      if (error) throw error

      // 統計を計算
      const totalCards = 100 // 百人一首の総数
      const studiedCards = records?.length || 0
      const totalCorrect = records?.reduce((sum, record) => sum + record.correct_count, 0) || 0
      const totalIncorrect = records?.reduce((sum, record) => sum + record.incorrect_count, 0) || 0
      const totalAttempts = totalCorrect + totalIncorrect
      const averageAccuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0
      
      // 最終学習日
      const lastStudyDate = records && records.length > 0 
        ? records.sort((a, b) => new Date(b.last_studied).getTime() - new Date(a.last_studied).getTime())[0].last_studied
        : ''

      // 連続学習日数の計算（簡易版）
      const studyStreak = calculateStudyStreak(records || [])

      setStats({
        totalCards,
        studiedCards,
        totalCorrect,
        totalIncorrect,
        averageAccuracy: Math.round(averageAccuracy * 100) / 100,
        studyStreak,
        lastStudyDate
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : '統計の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [user])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  }
}

// 連続学習日数を計算する関数
function calculateStudyStreak(records: StudyRecord[]): number {
  if (records.length === 0) return 0

  // 日付ごとに学習記録をグループ化
  const studyDates = records
    .map(record => new Date(record.last_studied).toDateString())
    .filter((date, index, array) => array.indexOf(date) === index)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  let streak = 0
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()

  // 今日または昨日から連続しているかチェック
  let currentDate = studyDates[0] === today ? today : 
                   studyDates[0] === yesterday ? yesterday : null

  if (!currentDate) return 0

  for (let i = 0; i < studyDates.length; i++) {
    if (studyDates[i] === currentDate) {
      streak++
      // 前日に戻る
      const prevDate = new Date(new Date(currentDate).getTime() - 24 * 60 * 60 * 1000).toDateString()
      currentDate = prevDate
    } else {
      break
    }
  }

  return streak
}