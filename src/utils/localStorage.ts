import { Memo } from '../types';

const STORAGE_KEY = 'memo-app-data';

export interface StoredData {
  memos: Memo[];
  totalCount: number;
  timestamp: string;
}

export class LocalStorageManager {
  /**
   * メモデータをローカルストレージに保存
   */
  static save(memos: Memo[]): void {
    try {
      const data: StoredData = {
        memos: memos.map(memo => ({
          ...memo,
          // Dateオブジェクトを文字列に変換して保存
          createdAt: memo.createdAt instanceof Date ? memo.createdAt : new Date(memo.createdAt),
          updatedAt: memo.updatedAt instanceof Date ? memo.updatedAt : new Date(memo.updatedAt),
        })),
        totalCount: memos.length,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save memos to localStorage:', error);
      throw new Error('メモの保存に失敗しました');
    }
  }

  /**
   * ローカルストレージからメモデータを読み込み
   */
  static load(): Memo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return [];
      }

      const parsed: StoredData = JSON.parse(data);
      
      // データの妥当性チェック
      if (!Array.isArray(parsed.memos)) {
        console.warn('Invalid memos data in localStorage');
        return [];
      }

      // 文字列からDateオブジェクトに変換
      return parsed.memos.map(memo => ({
        ...memo,
        createdAt: new Date(memo.createdAt),
        updatedAt: new Date(memo.updatedAt),
      }));
    } catch (error) {
      console.error('Failed to load memos from localStorage:', error);
      return [];
    }
  }

  /**
   * ローカルストレージをクリア
   */
  static clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }

  /**
   * ストレージのサイズをチェック（MB単位）
   */
  static getStorageSize(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return 0;
      
      // 文字列のバイト数を計算（UTF-8想定）
      const bytes = new Blob([data]).size;
      return bytes / (1024 * 1024); // MB変換
    } catch (error) {
      console.error('Failed to calculate storage size:', error);
      return 0;
    }
  }

  /**
   * バックアップデータの作成
   */
  static exportData(): string {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data || '{}';
    } catch (error) {
      console.error('Failed to export data:', error);
      throw new Error('データのエクスポートに失敗しました');
    }
  }

  /**
   * バックアップデータのインポート
   */
  static importData(jsonData: string): void {
    try {
      const parsed = JSON.parse(jsonData);
      
      // データの妥当性チェック
      if (!parsed.memos || !Array.isArray(parsed.memos)) {
        throw new Error('無効なデータ形式です');
      }

      localStorage.setItem(STORAGE_KEY, jsonData);
    } catch (error) {
      console.error('Failed to import data:', error);
      throw new Error('データのインポートに失敗しました');
    }
  }

  /**
   * ストレージが利用可能かチェック
   */
  static isAvailable(): boolean {
    try {
      const testKey = '__test_localStorage__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}