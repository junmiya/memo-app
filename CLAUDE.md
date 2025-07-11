# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code) に対するガイダンスを提供します。

## 環境概要

これは、セキュリティ制限が設定されたdevcontainerとして構成されたClaude Codeサンドボックス環境です。環境には以下が含まれます：

- **ランタイム**: Node.js 20（npmグローバルパッケージサポート付き）
- **シェル**: zsh（fzf統合とコマンド履歴の永続化）
- **セキュリティ**: 特定のドメインのみを許可する制限的ファイアウォール（GitHub、npmレジストリ、Anthropic API、Sentry、Statsig）
- **ツール**: git、gh CLI、delta、jq、および標準開発ユーティリティ

## ネットワークセキュリティ

環境は以下の制限的ファイアウォールで動作します：
- 承認されたドメインへのアウトバウンド接続のみを許可（GitHub、npmレジストリ、Anthropic API、Sentry、Statsig）
- その他すべての外部ネットワークアクセスをブロック
- DNS解決とlocalhost接続を維持
- 起動時に接続性を検証

**重要**: 未承認のレジストリからの外部API呼び出しやパッケージインストールは、ファイアウォール制限により失敗します。

## 開発コマンド

これはサンドボックス環境であるため、標準的な開発コマンドは作成するプロジェクトに依存します：

- **Node.jsプロジェクト**: `npm init`、`npm install`、`npm start`、`npm test`を使用
- **一般的な開発**: すべての標準Node.jsツールが利用可能
- **Git操作**: GitHub操作のための完全なgitとgh CLIサポート
- **パッケージ管理**: 公式npmレジストリへのアクセス付きnpm

## 環境変数

設定されている主要な環境変数：
- `DEVCONTAINER=true` - devcontainer環境を示す
- `NODE_OPTIONS=--max-old-space-size=4096` - Node.jsのメモリ制限を増加
- `CLAUDE_CONFIG_DIR=/home/node/.claude` - Claude設定ディレクトリ
- `NPM_CONFIG_PREFIX=/usr/local/share/npm-global` - グローバルnpmパッケージの場所

## ファイルシステム構造

- `/workspace` - メインワーキングディレクトリ（ホストからマウント）
- `/home/node/.claude` - Claude設定（永続ボリューム）
- `/commandhistory` - 永続bash/zsh履歴（永続ボリューム）
- `/usr/local/share/npm-global` - グローバルnpmパッケージ

## 権限

環境には特定の権限が設定されています：
- `Bash(find:*)` - findコマンドの実行を許可
- ワークスペース内での標準ファイルシステムアクセス
- ファイアウォール管理のみのsudoアクセス

## VS Code統合

devcontainerには以下のVS Code拡張機能が含まれています：
- JavaScript/TypeScriptリンティング用ESLint
- コード整形用Prettier
- Git統合用GitLens
- 保存時フォーマットとESLint自動修正が有効

## セキュリティに関する考慮事項

これはネットワーク制限があるサンドボックス環境です。外部依存関係を扱う際：
- 承認されたドメインのみアクセス可能
- パッケージインストールはnpmレジストリを使用する必要がある
- カスタムレジストリやミラーはブロックされる
- ドメインが事前承認されていない限り、外部API統合は失敗する可能性がある

## プロジェクト設計情報

### メモサイト（2面構成メモカード）

このリポジトリではメモサイトの設計書が作成されており、以下の構成で実装可能です：

#### データ構造
```typescript
interface Memo {
  id: string;
  frontContent: string;  // 表面内容
  backContent: string;   // 裏面内容
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  color?: string;
  isStarred?: boolean;
}
```

#### 主要技術スタック
- **フロントエンド**: React/Vue.js + TypeScript
- **状態管理**: Redux/Pinia
- **スタイリング**: CSS（フリップアニメーション）
- **ストレージ**: localStorage / Firebase
- **ビルドツール**: Vite

#### カードフリップアニメーション実装
```css
.memo-card-container {
  perspective: 1000px;
}

.memo-card {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.memo-card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  backface-visibility: hidden;
  position: absolute;
}

.back {
  transform: rotateY(180deg);
}
```

#### 開発時の主要コマンド
- プロジェクト初期化: `npm create vite@latest memo-app --template react-ts`
- 依存関係インストール: `npm install`
- 開発サーバー起動: `npm run dev`
- ビルド: `npm run build`
- テスト実行: `npm run test`

#### 実装フェーズ
1. **Phase 1**: ✅ **完了** - UI構築（カード、CRUD操作）
2. **Phase 2**: ページネーション、検索・タグ機能
3. **Phase 3**: Firebase連携、仮想スクロール対応

#### Phase 1 完了状況（2025-01-11）
- ✅ 基本CRUD機能完備
- ✅ カードフリップアニメーション実装
- ✅ ローカルストレージ永続化
- ✅ レスポンシブデザイン対応
- ✅ TypeScript + Redux完全実装

#### 開発時のコマンド
- 開発サーバー起動: `npm run dev`
- プロダクションビルド: `npm run build`
- 型チェック: `npm run lint`

詳細な設計書は `/workspace/メモサイト基本設計書.md` を参照してください。
Phase 1完了レポート: `/workspace/Phase1完了レポート.md`