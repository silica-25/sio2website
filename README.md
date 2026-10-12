# sio2 website

雑多にあふれた個人サイト。趣味、家計簿アプリの開発ログ、写真、Note の記事へのリンクなどを置く。

- フレームワーク: [Astro](https://astro.build)
- ホスティング: [Vercel](https://sio2website.vercel.app)

**ログ・写真・趣味などの更新方法は [GUIDE.md](./GUIDE.md) にまとめてあります。**

## 開発

```sh
npm install
npm run dev
```

## ディレクトリ

- `src/pages/` — 各ページ
- `src/components/` — ヘッダーやフッターなどの共通パーツ
- `src/layouts/` — 全ページ共通のレイアウト
- `src/data/site.ts` — サイト全体の文言・データ(ここを書き換えるだけで各ページに反映される)
- `src/data/log/` — ログ(雑多なひとこと)。趣味(タグ)ごとにファイルが分かれている
- `src/data/notes.ts` — ビルド時に Note の RSS を取り込む処理
- `src/assets/photos/` — Photos ページに並ぶ写真置き場
