# vite-static-site

Vite × Sass 大規模静的サイト開発環境

## 概要

このプロジェクトは、Vite と Sass を組み合わせた大規模静的サイト開発のための環境です。
高速な開発サーバー、効率的な Sass コンパイル、モジュラーな JavaScript 構造、そして最適化されたビルドプロセスを提供します。

## 特徴

- Vite による高速な開発環境と最適化されたビルド
- Sass による強力な CSS 前処理
- モジュラーで拡張性の高い JavaScript 構造
- PostCSS による追加の CSS 処理と最適化
- モジュラーで拡張性の高い Sass/CSS 構造
- 複数ページのサポート
- 画像やその他のアセットの最適化

## セットアップ

1. リポジトリをクローン：

   ```
   git clone https://github.com/your-username/vite-static-site.git
   cd vite-static-site
   ```

2. 依存関係のインストール：

   ```
   npm install
   ```

   注：初回のみ実行が必要です。

## 使用方法

### 開発サーバーの起動

開発環境を立ち上げるには以下のコマンドを実行します：

```
npm run dev
```

これにより、ローカル開発サーバーが起動し、Sass と JavaScript ファイルの変更を監視・コンパイルします。

### プロダクションビルド

最適化された完成ファイルを `dist` ディレクトリに出力するには、以下のコマンドを実行します：

```
npm run build
```

ビルドが完了すると、`dist` フォルダ内に最適化された HTML、CSS、JavaScript、および他のアセットが生成されます。

## プロジェクト構造

```
vite-static-site/
├── src/
│   ├── assets/
│   │   ├── sass/
│   │   │   ├── components/
│   │   │   ├── foundation/
│   │   │   ├── global/
│   │   │   ├── layout/
│   │   │   ├── project/
│   │   │   ├── utility/
│   │   │   └── styles.scss
│   │   └── img/
│   ├── js/
│   │   ├── components/
│   │   └── main.js
│   ├── index.html
│   └── [その他のHTMLファイル]
├── dist/         (ビルド後に生成)
├── vite.config.js
├── package.json
└── README.md
```

## Sass/CSS 構造

Sass ファイルは `src/assets/sass/` ディレクトリ内で管理されています：

- `components/`: 再利用可能な UI コンポーネント
- `foundation/`: 全体設定
- `global/`: 変数・ブレイクポイントマップの設定
- `layout/`: サイト全体のレイアウト構造
- `project/`: プロジェクト単位のスタイル
- `utility/`: 調整スタイル等
- `styles.scss`: すべての Sass ファイルをインポートするメインファイル

## JavaScript 構造

JavaScript ファイルは `src/js/` ディレクトリ内で管理されています：

- `components/`: 再利用可能な JavaScript コンポーネントやモジュール
- `main.js`: アプリケーションのエントリーポイント。他のコンポーネントをインポートし初期化します。

## 注意事項

- 大規模プロジェクト向けに設計されていますが、必要に応じて構造をカスタマイズできます。

## パフォーマンス最適化

- CSS と JavaScript の自動ミニファイ
- 画像の最適化
- コード分割とレイジーローディング
- Tree-shaking による未使用コードの除去
