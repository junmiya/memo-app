import { Memo } from '../types';
import { v4 as uuidv4 } from 'uuid';

// 百人一首データ
export const hyakuninIsshuData: Omit<Memo, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // 1番 天智天皇
  { 
    frontContent: 'あきのたの かりほのいおの とまをあらみ\n秋の田の かりほの庵の 苫をあらみ\n天智天皇', 
    backContent: 'わがころもでは つゆにぬれつつ\nわが衣手は 露にぬれつつ\n決まり字: あき', 
    tags: ['百人一首', '秋', '天皇', '決まり字:あ行', '決まり字:2文字', '初級レベル'], 
    color: 'purple' 
  },
  // 2番 持統天皇
  { 
    frontContent: 'はるすぎて なつきにけらし しろたえの\n春すぎて 夏来にけらし 白妙の\n持統天皇', 
    backContent: 'ころもほすちょう あまのかぐやま\n衣ほすてふ 天の香具山\n決まり字: はる', 
    tags: ['百人一首', '夏', '天皇', '決まり字:は行', '決まり字:2文字', '初級レベル'], 
    color: 'green' 
  },
  // 3番 柿本人麻呂
  { 
    frontContent: 'あしびきの やまどりのおの しだりおの\nあしびきの 山鳥の尾の しだり尾の\n柿本人麻呂', 
    backContent: 'ながながしよを ひとりかもねん\nながながし夜を ひとりかも寝む\n決まり字: あし', 
    tags: ['百人一首', '恋', '歌人', '決まり字:あ行', '決まり字:2文字', '初級レベル'], 
    color: 'blue' 
  },
  // 4番 山部赤人
  { 
    frontContent: 'たごのうらに うちいでてみれば しろたえの\n田子の浦に うち出でて見れば 白妙の\n山部赤人', 
    backContent: 'ふじのたかねに ゆきはふりつつ\n富士の高嶺に 雪は降りつつ\n決まり字: たご', 
    tags: ['百人一首', '冬', '歌人', '決まり字:た行', '決まり字:2文字', '初級レベル'], 
    color: 'blue' 
  },
  // 5番 猿丸大夫
  { 
    frontContent: 'おくやまに もみじふみわけ なくしかの\n奥山に 紅葉踏み分け 鳴く鹿の\n猿丸大夫', 
    backContent: 'こえきくときぞ あきはかなしき\n声聞く時ぞ 秋は悲しき\n決まり字: おく', 
    tags: ['百人一首', '秋', '歌人', '決まり字:あ行', '決まり字:2文字', '初級レベル'], 
    color: 'purple' 
  },
  // 6番 中納言家持
  { 
    frontContent: 'かささぎの わたせるはしに おくしもの\nかささぎの 渡せる橋に 置く霜の\n中納言家持', 
    backContent: 'しろきをみれば よぞふけにける\n白きを見れば 夜ぞ更けにける\n決まり字: かさ', 
    tags: ['百人一首', '冬', '貴族', '決まり字:か行', '決まり字:2文字', '初級レベル'], 
    color: 'indigo' 
  },
  // 7番 阿部右大臣
  { 
    frontContent: 'あまのはら ふりさけみれば かすがなる\n天の原 ふりさけ見れば 春日なる\n阿部右大臣', 
    backContent: 'みかさのやまに いでしつきかも\n三笠の山に 出でし月かも\n決まり字: あまの', 
    tags: ['百人一首', '月', '貴族', '決まり字:あ行', '決まり字:3文字以上', '中級レベル'], 
    color: 'indigo' 
  },
  // 8番 喜撰法師
  { 
    frontContent: 'わがいおは みやこのたつみ しかぞすむ\nわが庵は 都のたつみ しかぞ住む\n喜撰法師', 
    backContent: 'よをうじやまと ひとはいうなり\n世をうぢ山と 人はいふなり\n決まり字: わがい', 
    tags: ['百人一首', '住居', '僧侶', '決まり字:わ行', '決まり字:3文字以上', '中級レベル'], 
    color: 'gray' 
  },
  // 9番 小野小町
  { 
    frontContent: 'はなのいろは うつりにけりな いたずらに\n花の色は 移りにけりな いたづらに\n小野小町', 
    backContent: 'わがみよにふる ながめせしまに\nわが身世にふる ながめせしまに\n決まり字: はなの', 
    tags: ['百人一首', '恋', '女性歌人', '決まり字:は行', '決まり字:3文字以上', '中級レベル'], 
    color: 'pink' 
  },
  // 10番 蝉丸
  { 
    frontContent: 'これやこの いくもかえるも わかれては\nこれやこの 行くも帰るも 別れては\n蝉丸', 
    backContent: 'しるもしらぬも おうさかのせき\n知るも知らぬも 逢坂の関\n決まり字: これ', 
    tags: ['百人一首', '人生', '歌人', '決まり字:か行', '決まり字:2文字', '初級レベル'], 
    color: 'blue' 
  },
  // 11番 参議篁
  { 
    frontContent: 'わたのはら やそしまかけて こぎいでぬと\nわたの原 八十島かけて 漕ぎ出でぬと\n参議篁', 
    backContent: 'ひとにはつげよ あまのつりぶね\n人には告げよ 海人の釣舟\n決まり字: わた', 
    tags: ['百人一首', '海', '歌人', '決まり字:わ行', '決まり字:2文字', '初級レベル'], 
    color: 'blue' 
  },
  // 12番 僧正遍昭
  { 
    frontContent: 'あまつかぜ くものかよいじ ふきとじよ\n天つ風 雲の通ひ路 吹き閉ぢよ\n僧正遍昭', 
    backContent: 'おとめのすがた しばしとどめん\n乙女の姿 しばしとどめむ\n決まり字: あまつ', 
    tags: ['百人一首', '恋', '僧侶', '決まり字:あ行', '決まり字:3文字以上', '中級レベル'], 
    color: 'gray' 
  },
  // 13番 陽成院
  { 
    frontContent: 'つくばねの みねよりおつる みなのがわ\n筑波嶺の 峰より落つる みなの川\n陽成院', 
    backContent: 'こいぞつもりて ふちとなりぬる\n恋ぞ積もりて 淵となりぬる\n決まり字: つく', 
    tags: ['百人一首', '恋', '天皇', '決まり字:た行', '決まり字:2文字', '初級レベル'], 
    color: 'purple' 
  },
  // 14番 河原左大臣
  { 
    frontContent: 'みちのくの しのぶもじずり たれゆえに\n陸奥の しのぶもぢずり 誰ゆゑに\n河原左大臣', 
    backContent: 'みだれそめにし われならなくに\n乱れそめにし 我ならなくに\n決まり字: みち', 
    tags: ['百人一首', '恋', '貴族', '決まり字:ま行', '決まり字:2文字', '初級レベル'], 
    color: 'indigo' 
  },
  // 15番 光孝天皇
  { 
    frontContent: 'きみがため はるののにいでて わかなつむ\n君がため 春の野に出でて 若菜摘む\n光孝天皇', 
    backContent: 'わがころもでに ゆきはふりつつ\nわが衣手に 雪は降りつつ\n決まり字: きみが', 
    tags: ['百人一首', '春', '天皇', '決まり字:か行', '決まり字:3文字以上', '中級レベル'], 
    color: 'green' 
  },
  // 16番 中納言行平
  { 
    frontContent: 'たちわかれ いなばのやまの みねにおうる\n立ち別れ いなばの山の 峰に生ふる\n中納言行平', 
    backContent: 'まつとしきかば いまかえりこん\nまつとし聞かば 今帰り来む\n決まり字: たち', 
    tags: ['百人一首', '別れ', '貴族', '決まり字:た行', '決まり字:2文字', '初級レベル'], 
    color: 'indigo' 
  },
  // 17番 在原業平朝臣
  { 
    frontContent: 'ちはやぶる かみよもきかず たつたがわ\nちはやぶる 神代も聞かず 竜田川\n在原業平朝臣', 
    backContent: 'からくれないに みずくくるとは\n唐紅に 水くくるとは\n決まり字: ちは', 
    tags: ['百人一首', '秋', '歌人', '決まり字:ち行', '決まり字:2文字', '初級レベル'], 
    color: 'purple' 
  },
  // 18番 藤原敏行朝臣
  { 
    frontContent: 'すみのえの きしによるなみ よるさえや\n住の江の 岸に寄る波 よるさへや\n藤原敏行朝臣', 
    backContent: 'ゆめのかよいじ ひとめよくらん\n夢の通ひ路 人目よくらむ\n決まり字: すみ', 
    tags: ['百人一首', '恋', '歌人', '決まり字:さ行', '決まり字:2文字', '初級レベル'], 
    color: 'pink' 
  },
  // 19番 伊勢
  { 
    frontContent: 'なにわがた みじかきあしの ふしのまも\n難波潟 短き蘆の 節の間も\n伊勢', 
    backContent: 'あわでこのよを すぐしてよとや\n逢はでこの世を 過ぐしてよとや\n決まり字: なに', 
    tags: ['百人一首', '恋', '女性歌人', '決まり字:な行', '決まり字:2文字', '初級レベル'], 
    color: 'pink' 
  },
  // 20番 元良親王
  { 
    frontContent: 'わびぬれば いまはたおなじ なにわなる\nわびぬれば 今はた同じ 難波なる\n元良親王', 
    backContent: 'みをつくしても あわんとぞおもう\n身をつくしても 逢はむとぞ思ふ\n決まり字: わび', 
    tags: ['百人一首', '恋', '皇族', '決まり字:わ行', '決まり字:2文字', '初級レベル'], 
    color: 'purple' 
  }
];

// 英検4級データは削除されました

// サンプルデータをMemoオブジェクトに変換
export const createSampleMemos = (): Memo[] => {
  const now = new Date();
  
  // 百人一首データのみ使用
  const allSampleData = hyakuninIsshuData;
  
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
    
    // 百人一首タグを持つメモが存在するかチェック
    return memos.some((memo: any) => 
      memo.tags && memo.tags.includes('百人一首')
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
      console.log('百人一首サンプルデータを初期化しました:', sampleMemos.length, '件');
    } catch (error) {
      console.error('サンプルデータの初期化に失敗しました:', error);
    }
  }
};