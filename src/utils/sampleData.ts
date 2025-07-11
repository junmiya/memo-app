import { Memo } from '../types';
import { v4 as uuidv4 } from 'uuid';

// 英検4級頻出単語サンプルデータ
export const eiken4SampleData: Omit<Memo, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // 基本動詞
  { frontContent: 'have', backContent: '持つ、食べる', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'make', backContent: '作る', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'take', backContent: '取る、持って行く', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'give', backContent: '与える', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'come', backContent: '来る', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'go', backContent: '行く', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'get', backContent: '手に入れる、到着する', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'know', backContent: '知っている', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'think', backContent: '思う、考える', tags: ['英検4級', '動詞'], color: 'blue' },
  { frontContent: 'work', backContent: '働く', tags: ['英検4級', '動詞'], color: 'blue' },

  // 日常生活
  { frontContent: 'family', backContent: '家族', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'friend', backContent: '友達', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'school', backContent: '学校', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'teacher', backContent: '先生', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'student', backContent: '生徒', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'house', backContent: '家', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'room', backContent: '部屋', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'food', backContent: '食べ物', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'breakfast', backContent: '朝食', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'lunch', backContent: '昼食', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'dinner', backContent: '夕食', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'time', backContent: '時間', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'day', backContent: '日', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'week', backContent: '週', tags: ['英検4級', '名詞'], color: 'green' },
  { frontContent: 'month', backContent: '月', tags: ['英検4級', '名詞'], color: 'green' },

  // 形容詞
  { frontContent: 'good', backContent: '良い', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'bad', backContent: '悪い', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'big', backContent: '大きい', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'small', backContent: '小さい', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'new', backContent: '新しい', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'old', backContent: '古い', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'young', backContent: '若い', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'happy', backContent: '幸せな', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'easy', backContent: '簡単な', tags: ['英検4級', '形容詞'], color: 'yellow' },
  { frontContent: 'difficult', backContent: '難しい', tags: ['英検4級', '形容詞'], color: 'yellow' },

  // スポーツ・趣味
  { frontContent: 'play', backContent: '遊ぶ、演奏する', tags: ['英検4級', '動詞', 'スポーツ'], color: 'purple' },
  { frontContent: 'music', backContent: '音楽', tags: ['英検4級', '名詞', '趣味'], color: 'purple' },
  { frontContent: 'movie', backContent: '映画', tags: ['英検4級', '名詞', '趣味'], color: 'purple' },
  { frontContent: 'book', backContent: '本', tags: ['英検4級', '名詞', '趣味'], color: 'purple' },
  { frontContent: 'sport', backContent: 'スポーツ', tags: ['英検4級', '名詞', 'スポーツ'], color: 'purple' },
  { frontContent: 'soccer', backContent: 'サッカー', tags: ['英検4級', '名詞', 'スポーツ'], color: 'purple' },
  { frontContent: 'tennis', backContent: 'テニス', tags: ['英検4級', '名詞', 'スポーツ'], color: 'purple' },
  { frontContent: 'swim', backContent: '泳ぐ', tags: ['英検4級', '動詞', 'スポーツ'], color: 'purple' },

  // その他重要語
  { frontContent: 'because', backContent: 'なぜなら', tags: ['英検4級', '接続詞'], color: 'pink' },
  { frontContent: 'before', backContent: '前に', tags: ['英検4級', '前置詞'], color: 'pink' },
  { frontContent: 'after', backContent: '後に', tags: ['英検4級', '前置詞'], color: 'pink' },
  { frontContent: 'when', backContent: 'いつ', tags: ['英検4級', '疑問詞'], color: 'pink' },
  { frontContent: 'where', backContent: 'どこで', tags: ['英検4級', '疑問詞'], color: 'pink' },
  { frontContent: 'what', backContent: '何', tags: ['英検4級', '疑問詞'], color: 'pink' },
  { frontContent: 'who', backContent: '誰', tags: ['英検4級', '疑問詞'], color: 'pink' },

  // 追加の重要単語
  { frontContent: 'like', backContent: '好き', tags: ['英検4級', '動詞'], color: 'indigo' },
  { frontContent: 'love', backContent: '愛する', tags: ['英検4級', '動詞'], color: 'indigo' },
  { frontContent: 'help', backContent: '助ける', tags: ['英検4級', '動詞'], color: 'indigo' },
  { frontContent: 'study', backContent: '勉強する', tags: ['英検4級', '動詞'], color: 'indigo' },
  { frontContent: 'read', backContent: '読む', tags: ['英検4級', '動詞'], color: 'indigo' },
  { frontContent: 'write', backContent: '書く', tags: ['英検4級', '動詞'], color: 'indigo' },
];

// サンプルデータをMemoオブジェクトに変換
export const createSampleMemos = (): Memo[] => {
  const now = new Date();
  
  return eiken4SampleData.map((data, index) => ({
    id: uuidv4(),
    ...data,
    createdAt: new Date(now.getTime() - (eiken4SampleData.length - index) * 60000), // 1分間隔で過去に作成
    updatedAt: new Date(now.getTime() - (eiken4SampleData.length - index) * 60000),
  }));
};

// ローカルストレージにサンプルデータが存在するかチェック
export const hasSampleData = (): boolean => {
  try {
    const data = localStorage.getItem('memo-app-data');
    if (!data) return false;
    
    const parsed = JSON.parse(data);
    const memos = parsed.memos || [];
    
    // 英検4級タグを持つメモが存在するかチェック
    return memos.some((memo: any) => 
      memo.tags && memo.tags.includes('英検4級')
    );
  } catch (error) {
    return false;
  }
};

// サンプルデータを初期化
export const initializeSampleData = (): void => {
  if (!hasSampleData()) {
    const sampleMemos = createSampleMemos();
    
    try {
      const data = {
        memos: sampleMemos,
        totalCount: sampleMemos.length,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('memo-app-data', JSON.stringify(data));
      console.log('英検4級サンプルデータを初期化しました:', sampleMemos.length, '件');
    } catch (error) {
      console.error('サンプルデータの初期化に失敗しました:', error);
    }
  }
};