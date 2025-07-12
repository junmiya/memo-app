import { Memo } from '../types';
import { v4 as uuidv4 } from 'uuid';

// 百人一首データ
export const hyakuninIsshuData: Omit<Memo, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // 1番 天智天皇
  { 
    frontContent: '秋の田の かりほの庵の 苫をあらみ\nあきのたの かりほのいおの とまをあらみ', 
    backContent: 'わが衣手は 露にぬれつつ\nわがころもでは つゆにぬれつつ\n\n決まり字: あき\n作者: 天智天皇', 
    tags: ['百人一首', '秋', '天皇'], 
    color: 'purple' 
  },
  // 2番 持統天皇
  { 
    frontContent: '春すぎて 夏来にけらし 白妙の\nはるすぎて なつきにけらし しろたえの', 
    backContent: '衣ほすてふ 天の香具山\nころもほすちょう あまのかぐやま\n\n決まり字: はる\n作者: 持統天皇', 
    tags: ['百人一首', '夏', '天皇'], 
    color: 'green' 
  },
  // 3番 柿本人麻呂
  { 
    frontContent: 'あしびきの 山鳥の尾の しだり尾の\nあしびきの やまどりのおの しだりおの', 
    backContent: 'ながながし夜を ひとりかも寝む\nながながしよを ひとりかもねん\n\n決まり字: あし\n作者: 柿本人麻呂', 
    tags: ['百人一首', '恋', '歌人'], 
    color: 'blue' 
  },
  // 4番 山部赤人
  { 
    frontContent: '田子の浦に うち出でて見れば 白妙の\nたごのうらに うちいでてみれば しろたえの', 
    backContent: '富士の高嶺に 雪は降りつつ\nふじのたかねに ゆきはふりつつ\n\n決まり字: たご\n作者: 山部赤人', 
    tags: ['百人一首', '冬', '歌人'], 
    color: 'blue' 
  },
  // 5番 猿丸大夫
  { 
    frontContent: '奥山に 紅葉踏み分け 鳴く鹿の\nおくやまに もみじふみわけ なくしかの', 
    backContent: '声聞く時ぞ 秋は悲しき\nこえきくときぞ あきはかなしき\n\n決まり字: おく\n作者: 猿丸大夫', 
    tags: ['百人一首', '秋', '歌人'], 
    color: 'purple' 
  },
  // 6番 中納言家持
  { 
    frontContent: 'かささぎの 渡せる橋に 置く霜の\nかささぎの わたせるはしに おくしもの', 
    backContent: '白きを見れば 夜ぞ更けにける\nしろきをみれば よぞふけにける\n\n決まり字: かさ\n作者: 中納言家持', 
    tags: ['百人一首', '冬', '貴族'], 
    color: 'indigo' 
  },
  // 7番 阿部右大臣
  { 
    frontContent: '天の原 ふりさけ見れば 春日なる\nあまのはら ふりさけみれば かすがなる', 
    backContent: '三笠の山に 出でし月かも\nみかさのやまに いでしつきかも\n\n決まり字: あまの\n作者: 阿部右大臣', 
    tags: ['百人一首', '月', '貴族'], 
    color: 'indigo' 
  },
  // 8番 喜撰法師
  { 
    frontContent: 'わが庵は 都のたつみ しかぞ住む\nわがいおは みやこのたつみ しかぞすむ', 
    backContent: '世をうぢ山と 人はいふなり\nよをうじやまと ひとはいうなり\n\n決まり字: わがい\n作者: 喜撰法師', 
    tags: ['百人一首', '住居', '僧侶'], 
    color: 'gray' 
  },
  // 9番 小野小町
  { 
    frontContent: '花の色は 移りにけりな いたづらに\nはなのいろは うつりにけりな いたずらに', 
    backContent: 'わが身世にふる ながめせしまに\nわがみよにふる ながめせしまに\n\n決まり字: はなの\n作者: 小野小町', 
    tags: ['百人一首', '恋', '女性歌人'], 
    color: 'pink' 
  },
  // 10番 蝉丸
  { 
    frontContent: 'これやこの 行くも帰るも 別れては\nこれやこの いくもかえるも わかれては', 
    backContent: '知るも知らぬも 逢坂の関\nしるもしらぬも おうさかのせき\n\n決まり字: これ\n作者: 蝉丸', 
    tags: ['百人一首', '人生', '歌人'], 
    color: 'blue' 
  },
  // 11番 参議篁
  { 
    frontContent: 'わたの原 八十島かけて 漕ぎ出でぬと\nわたのはら やそしまかけて こぎいでぬと', 
    backContent: '人には告げよ 海人の釣舟\nひとにはつげよ あまのつりぶね\n\n決まり字: わた\n作者: 参議篁', 
    tags: ['百人一首', '海', '歌人'], 
    color: 'blue' 
  },
  // 12番 僧正遍昭
  { 
    frontContent: '天つ風 雲の通ひ路 吹き閉ぢよ\nあまつかぜ くものかよいじ ふきとじよ', 
    backContent: '乙女の姿 しばしとどめむ\nおとめのすがた しばしとどめん\n\n決まり字: あまつ\n作者: 僧正遍昭', 
    tags: ['百人一首', '恋', '僧侶'], 
    color: 'gray' 
  },
  // 13番 陽成院
  { 
    frontContent: '筑波嶺の 峰より落つる みなの川\nつくばねの みねよりおつる みなのがわ', 
    backContent: '恋ぞ積もりて 淵となりぬる\nこいぞつもりて ふちとなりぬる\n\n決まり字: つく\n作者: 陽成院', 
    tags: ['百人一首', '恋', '天皇'], 
    color: 'purple' 
  },
  // 14番 河原左大臣
  { 
    frontContent: '陸奥の しのぶもぢずり 誰ゆゑに\nみちのくの しのぶもじずり たれゆえに', 
    backContent: '乱れそめにし 我ならなくに\nみだれそめにし われならなくに\n\n決まり字: みち\n作者: 河原左大臣', 
    tags: ['百人一首', '恋', '貴族'], 
    color: 'indigo' 
  },
  // 15番 光孝天皇
  { 
    frontContent: '君がため 春の野に出でて 若菜摘む\nきみがため はるののにいでて わかなつむ', 
    backContent: 'わが衣手に 雪は降りつつ\nわがころもでに ゆきはふりつつ\n\n決まり字: きみが\n作者: 光孝天皇', 
    tags: ['百人一首', '春', '天皇'], 
    color: 'green' 
  },
  // 16番 中納言行平
  { 
    frontContent: '立ち別れ いなばの山の 峰に生ふる\nたちわかれ いなばのやまの みねにおうる', 
    backContent: 'まつとし聞かば 今帰り来む\nまつとしきかば いまかえりこん\n\n決まり字: たち\n作者: 中納言行平', 
    tags: ['百人一首', '別れ', '貴族'], 
    color: 'indigo' 
  },
  // 17番 在原業平朝臣
  { 
    frontContent: 'ちはやぶる 神代も聞かず 竜田川\nちはやぶる かみよもきかず たつたがわ', 
    backContent: '唐紅に 水くくるとは\nからくれないに みずくくるとは\n\n決まり字: ちは\n作者: 在原業平朝臣', 
    tags: ['百人一首', '秋', '歌人'], 
    color: 'purple' 
  },
  // 18番 藤原敏行朝臣
  { 
    frontContent: '住の江の 岸に寄る波 よるさへや\nすみのえの きしによるなみ よるさえや', 
    backContent: '夢の通ひ路 人目よくらむ\nゆめのかよいじ ひとめよくらん\n\n決まり字: すみ\n作者: 藤原敏行朝臣', 
    tags: ['百人一首', '恋', '歌人'], 
    color: 'pink' 
  },
  // 19番 伊勢
  { 
    frontContent: '難波潟 短き蘆の 節の間も\nなにわがた みじかきあしの ふしのまも', 
    backContent: '逢はでこの世を 過ぐしてよとや\nあわでこのよを すぐしてよとや\n\n決まり字: なに\n作者: 伊勢', 
    tags: ['百人一首', '恋', '女性歌人'], 
    color: 'pink' 
  },
  // 20番 元良親王
  { 
    frontContent: 'わびぬれば 今はた同じ 難波なる\nわびぬれば いまはたおなじ なにわなる', 
    backContent: '身をつくしても 逢はむとぞ思ふ\nみをつくしても あわんとぞおもう\n\n決まり字: わび\n作者: 元良親王', 
    tags: ['百人一首', '恋', '皇族'], 
    color: 'purple' 
  }
];

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
  
  // 百人一首と英検4級データを結合
  const allSampleData = [...hyakuninIsshuData, ...eiken4SampleData];
  
  return allSampleData.map((data, index) => ({
    id: uuidv4(),
    ...data,
    createdAt: new Date(now.getTime() - (allSampleData.length - index) * 60000), // 1分間隔で過去に作成
    updatedAt: new Date(now.getTime() - (allSampleData.length - index) * 60000),
  }));
};

// ローカルストレージにサンプルデータが存在するかチェック
export const hasSampleData = (): boolean => {
  try {
    const data = localStorage.getItem('memo-app-data');
    if (!data) return false;
    
    const parsed = JSON.parse(data);
    const memos = parsed.memos || [];
    
    // 英検4級または百人一首タグを持つメモが存在するかチェック
    return memos.some((memo: any) => 
      memo.tags && (memo.tags.includes('英検4級') || memo.tags.includes('百人一首'))
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
      console.log('サンプルデータを初期化しました:', sampleMemos.length, '件（百人一首 + 英検4級）');
    } catch (error) {
      console.error('サンプルデータの初期化に失敗しました:', error);
    }
  }
};