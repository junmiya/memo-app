# 🎴 かるたカード - 英検4級英単語学習アプリ

React + TypeScript + Redux Toolkit で作られた、表裏2面のフラッシュカードアプリケーションです。

## ✨ 主な機能

### Phase 1 完了機能
- **フラッシュカード作成・編集・削除** - 表面・裏面の2面構成
- **カードフリップアニメーション** - 3D CSS transform
- **ローカルストレージ永続化** - データの自動保存
- **レスポンシブデザイン** - PC・タブレット・モバイル対応
- **カラーテーマ** - 8色のカラーパレット
- **タグ機能** - カードの分類・整理

### Phase 2 完了機能
- **リアルタイム検索** - 300msデバウンス、全文検索
- **高度なフィルタリング** - タグ、カラー、お気に入り
- **多軸ソート** - 作成日、更新日、アルファベット順
- **統計情報表示** - メモ数、フィルター結果
- **UI/UX最適化** - 検索結果表示、空状態対応

## 🚀 技術スタック

- **Frontend**: React 18, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Storage**: LocalStorage (将来的にFirebase対応予定)

## 📦 セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プレビュー
npm run preview
```

## 🏗️ プロジェクト構造

```
src/
├── components/          # UIコンポーネント
│   ├── layout/         # レイアウト関連
│   ├── memo/           # メモ機能
│   ├── search/         # 検索・フィルター
│   └── ui/             # 再利用可能UI
├── store/              # Redux状態管理
│   ├── slices/         # Redux slices
│   └── middleware/     # カスタムミドルウェア
├── types/              # TypeScript型定義
├── utils/              # ユーティリティ関数
└── hooks/              # カスタムhooks
```

## 🎯 今後の予定

### Phase 3 (予定)
- Firebase統合
- 認証機能
- クラウド同期
- オフライン対応
- PWA化
- 仮想スクロール

## 📝 ライセンス

MIT License

## 🔗 デプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

このアプリは Vercel にデプロイされています。

---

**開発者**: Claude Code Assistant  
**最終更新**: 2025-01-11