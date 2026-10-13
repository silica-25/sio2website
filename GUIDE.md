# 更新ガイド

サイトの中身(ログ・写真・趣味・アイコンなど)を更新するときに見る用のメモ。
コードを読まなくても、このページの通りにやれば更新できるようにまとめてあります。

## 0. 全体の流れ

1. ファイルを編集する(このガイドの 1〜5)
2. 手元で確認する(6)
3. GitHub に送って公開する(7)

**2 と 3 をやらない限り、実際のサイト(sio2website.vercel.app)は変わりません。**
ファイルを保存しただけでは公開されないので安心して編集してください。

---

## 1. ログを増やす(トップ・Kakeibo・Hobbies の「ひとこと」)

ログは `src/data/log/` フォルダの中に、**タグ(趣味)ごとにファイルが分かれています**。
増やしたいタグのファイルを開いて、配列に 1 行足すだけです。

| tag | ファイル | 出る場所 |
|---|---|---|
| `kakeibo` | `src/data/log/kakeibo.ts` | `/kakeibo` の dev log |
| `taiko` | `src/data/log/taiko.ts` | `/hobbies/taiko` の log |
| `pokemon` | `src/data/log/pokemon.ts` | `/hobbies/pokemon` の log |
| `music` | `src/data/log/music.ts` | `/hobbies/music` の log |
| `etc` | `src/data/log/etc.ts` | `/hobbies/etc` の log |

例: `src/data/log/taiko.ts` に 1 行足す場合

```ts
{ date: '2026-09-25', tag: 'taiko', text: '段位道場、初段クリアした。' },
```

- **どこに足しても OK**。配列の先頭でも末尾でも、日付順に自動で並び替わります。
- `date`: `YYYY-MM-DD` の形式
- `tag`: そのファイルに書いてある tag と同じものを書く(コピペでOK)
- `text`: ひとこと。何をしたか書くだけ。

末尾のカンマを忘れずに(次の行との区切りに必要)。

**新しい趣味(タグ)を増やしたいとき**は、`src/data/log/` に新しいファイル(例: `game.ts`)を
既存のファイルを真似して作り、`src/data/log/index.ts` に import とスプレッド(`...gameLog`)を
1行ずつ足してください。トップページと Kakeibo の dev log はどのタグのログも横断して拾うので、
新しいファイルを足すだけで自動的に反映されます。

### 自分用のコメントを足す

どの形式(kind)にも `comment` を足せます。text/sub とは別に、もう少し長めの感想などを
書きたいときに使う欄です(引用線付きで少し小さめに表示されます)。

```ts
{ date: '2026-09-25', tag: 'taiko', kind: 'score', text: 'AAA 98.42%', comment: '久しぶりに全良出た、うれしい。' },
```

### ログの形式(kind)を変える

ふつうの一言(`text` だけ)以外に、いくつか形式が選べます。`kind` を指定して使ってください。

**`score`(スコア・記録を大きく見せる)**

```ts
{ date: '2026-09-25', tag: 'taiko', kind: 'score', text: 'AAA 98.42%', sub: '发狂BPM280 おに' },
```
`text` に数字/結果、`sub` に補足(曲名や大会名など)。

**`link`(URL カード)**

```ts
{ date: '2026-09-25', tag: 'taiko', kind: 'link', text: '公式サイトの新曲情報', url: 'https://taiko-ch.net/' },
```
`text` がカードの見出し、`url` がリンク先。ドメインが自動で添えられます。

**`quote`(引用・ひとこと大きめ)**

```ts
{ date: '2026-09-25', tag: 'etc', kind: 'quote', text: '好きな言葉やセリフなど', sub: '出典(あれば)' },
```

**`track`(曲・音楽)**

```ts
{
  date: '2026-09-25',
  tag: 'music',
  kind: 'track',
  text: '曲名 — アーティスト名',
  sub: 'アルバム名(あれば)',
  url: 'https://open.spotify.com/track/xxxxx',   // Spotify アプリ/サイトの「共有 → リンクをコピー」でOK
},
```
`url` に **Spotify のふつうの共有リンク**を貼ると、ジャケット画像はビルド時に自動で取ってきます。
`image` を自分で書く必要はありません(Spotify 以外の曲を載せたいときだけ、`image: '画像URL'` を手で足せば使えます)。
`url` を空にしても表示は崩れません(その部分だけ出ないだけ)。

**`embed`(Spotify のプレイヤーをそのまま埋め込む)**

```ts
{ date: '2026-09-25', tag: 'music', kind: 'embed', text: 'よく聴くプレイリスト', url: 'https://open.spotify.com/playlist/xxxxx' },
```
これも **ふつうの共有リンクでOK**。埋め込みコードを取ってくる必要はありません(自動でプレイヤー用のURLに変換されます)。

---

## 2. 写真を増やす(`/photos` とトップの photos 欄)

`src/assets/photos/` フォルダに画像を置くだけ。コードの編集は不要。

**ファイル名のルール**: `YYYY-MM-DD_キャプション.拡張子`

例: `2026-09-25_花火大会.jpg`
→ タップして拡大したときの吹き出しに `2026-09-25 · 花火大会` と出ます。

- 日付を付けないファイル名(例: `花火大会.jpg`)でも動きますが、
  - 吹き出しには日付が出ません
  - 並び順がファイル名のアルファベット順になり、思った並びにならないことがあります
  - なので基本は日付付きにするのがおすすめです。
- 対応する拡張子: `jpg` `jpeg` `png` `webp` `avif`(大文字でも OK)
- 並び順はファイル名の新しい順(日付の新しいものが先頭)。

### 写真にタグを付けて、ログにも表示する

`src/assets/photos/<tag>/` というサブフォルダに入れると、その写真にタグが付きます。
tag は 1 番の log と同じ名前を使ってください(`kakeibo` / `taiko` / `pokemon` / `etc` など)。

例: `src/assets/photos/taiko/2026-09-25_段位認定.jpg`
→ `/photos` の全体ギャラリーに出るのはもちろん、`/hobbies/taiko` の log にも
ひとことの記録と混ざって時系列で並びます(サムネイルをタップすると吹き出し付きで拡大表示)。

タグを付けたくない写真は、これまで通り `src/assets/photos/` の直下に置けば OK です。

### 写真に自分用のコメントを足す

キャプション(ファイル名から自動でできる部分)だけだと物足りないときは、
`src/data/site.ts` の `photoComments` にキャプションと同じ文字列をキーにして書く。

```ts
export const photoComments: Record<string, string> = {
  '段位認定': 'ここまで長かった…',
};
```

`src/assets/photos/taiko/2026-09-25_段位認定.jpg` ならキャプションは「段位認定」なので、
キーもそれに合わせる。付けると `/photos` の吹き出しと、タグページの log 一覧の両方に出ます。

---

## 3. 趣味を増やす・編集する(`/hobbies`)

`src/data/site.ts` の `hobbies` 配列を編集する。

**すでにある趣味の一言を書く場合**は `note` を埋めるだけ:

```ts
{ title: '太鼓の達人', note: 'AC でたまに段位挑戦してます。', slug: 'taiko', tag: 'taiko', body: '' },
```

**新しい趣味を増やす場合**は配列に 1 項目足す:

```ts
{ title: '新しい趣味', note: '一言説明', slug: 'newhobby', tag: 'newhobby', body: '' },
```

- `slug`: ページの URL になる部分(半角英数字)。`/hobbies/newhobby` ができます。
- `tag`: ログ(1番)の tag と合わせる。合わせると、そのタグのログが記録ページに出ます。
- `body`: 記録ページに出す説明文。書かなくても OK(空文字のままで問題なし)。

「写真」の項目だけは `slug` を付けず `href: '/photos'` のままにしてあります(専用のギャラリーページに直接飛ばすため)。真似して新しく外部リンク的な項目を作りたいときは `slug`/`tag`/`body` を消して `href` だけにしてください。

### 音楽ページ(`/hobbies/music`)だけの特別な設定

ログの上の「ランダムで再生」は、`src/data/log/music.ts` の曲(`kind: 'track'` で Spotify の URL があるもの)から
自動で選びます。曲を足せば自動で候補が増えるので、設定は要りません。

`src/data/site.ts` の `nowPlaying` と `music` を編集する。

```ts
// ページ上部に「今聴いてる曲」を出したいとき
export const nowPlaying = {
  enabled: true,                              // false だと何も表示されない
  title: '曲名',
  artist: 'アーティスト名',
  url: 'https://open.spotify.com/track/xxxxx', // Spotify のふつうの共有リンクでOK
  cover: '',                                   // 空なら url から自動取得される
};

export const music = {
  summary: 'ページ上部に出す説明文',
  embedUrl: 'https://open.spotify.com/playlist/xxxxx', // これもふつうの共有リンクでOK。空ならプレイヤーは出ない
};
```

---

## 4. 家計簿アプリの説明を変える

`src/data/site.ts` の `kakeibo` を編集する。

```ts
export const kakeibo = {
  name: '家計簿アプリ',
  status: '開発中',       // 'リリース済み' などに変えてもいい
  summary: '自分用に作っている家計簿アプリ。',
  keyword: '家計簿',       // Note の記事タイトルにこの文字が入っていると自動でこのページに並ぶ
  href: '',               // リポジトリやデモの URL(あれば)
};
```

---

## 4.5. About の自己紹介・経歴を変える

`src/data/site.ts` の `site.bio`(自己紹介文)と `timeline`(経歴)を編集する。

```ts
export const site = {
  ...
  bio: 'ここに自己紹介を書きます。',
  ...
};

export const timeline = [
  { year: '2025', text: '電気通信大学　Ⅰ類に入学' },
  { year: '2026', text: 'このサイトを公開' },
];
```

`timeline` はどこに足しても順番はそのまま表示されるので、古い順に並べて書いてください。

---

## 4.6. サイトの名前・説明・リンクなど(サイト全体の文言)を変える

サイト全体の文言は、ほとんど `src/data/site.ts` の**一番上の `site`** にまとまっています。

```ts
export const site = {
  name: 'sio2',                       // トップの大きな名前、フッター、タブのタイトル
  brand: 'sio2_website',              // 左上(ヘッダー)のロゴ文字
  title: 'sio2 | Personal Site',      // トップページのタブのタイトル
  description: '...',                 // 検索結果やSNSで共有したときの説明文
  tagline: '人生とは孤独である',        // トップの名前の下の一言
  bio: '...',                         // About の自己紹介文
  email: '...',                       // About・フッターのメールアドレス
  noteUser: 'sio2_25',                // Note のユーザー名(記事一覧の取得先)
  links: [                            // フッター・About の SNS リンク(増減OK)
    { label: 'Note', href: 'https://note.com/sio2_25' },
  ],
};
```

その下にも、変えたくなる場所があります。

| 変えたいもの | 場所 |
|---|---|
| ヘッダーのメニュー(名前・並び順・増減) | `src/data/site.ts` の `nav` |
| 家計簿ページの名前・状態・説明 | `src/data/site.ts` の `kakeibo`(4. 参照) |
| 経歴(About の timeline) | `src/data/site.ts` の `timeline` |
| 音楽ページの説明文 | `src/data/site.ts` の `music.summary` |
| 趣味の一覧・一言 | `src/data/site.ts` の `hobbies`(3. 参照) |

**ページに直接書いてある説明文**は、そのページのファイルを開いて書き換えます(`<p class="lead">` の中身が説明文です)。

| 変えたい文 | ファイル |
|---|---|
| Photos の説明文 | `src/pages/photos.astro` |
| Notes の説明文 | `src/pages/notes.astro` |
| Hobbies の説明文 | `src/pages/hobbies.astro` |
| トップの `// personal site` の小さいラベル、「趣味」タイル | `src/pages/index.astro` |

- ブラウザのタブに出る小さなアイコンは `public/favicon.svg`(と `favicon.ico`)を差し替えます。
- 文字を書き換えたら、6. で確認して 7. で公開します。
- `name` を変えると、トップの大きな名前・フッター・各ページのタブのタイトルがまとめて変わります。左上だけ変えたいときは `brand` です。

---

## 5. アイコン画像を差し替える(Home・About)

`src/assets/icon.png`(jpg / webp / avif でも可)という名前で画像を置く。

- 今は画像がないので、サイト名の頭文字(仮アイコン)が四角く出ています。
- ファイルを置いて手順 6・7 をやれば、自動でその画像に切り替わります。
- 正方形の画像がきれいに収まります。

---

## 6. 手元で確認する

```bash
npx astro dev --background
```

ブラウザで `http://localhost:4321` を開く。編集内容を保存すると自動で反映されます。

止めるときは:

```bash
npx astro dev stop
```

---

## 7. GitHub に送って公開する

確認して問題なければ:

```bash
git add -A
git commit -m "内容を更新"
git push
```

push すると Vercel が自動でビルドし直して、数十秒〜1分程度で
`https://sio2website.vercel.app` に反映されます(Note の新着記事もこのタイミングで取り込まれます)。
反映に数分かかることもあります。

**公開サイトが更新されないとき**: Vercel の sio2website → Deployments を開いて、新しいデプロイが
出ているか、エラー(赤)になっていないかを見てください。エラーならログの文面が原因の手がかりです。

**コミットのメールアドレスについて**: コミットには作者のメールアドレスが記録され、Public のリポジトリでは
誰でも見えます。このリポジトリは GitHub 用の noreply アドレス
(`288636233+silica-25@users.noreply.github.com`)で記録するよう設定してあります。
別のパソコンで作業するときは、最初に次の2行を実行してください。

```bash
git config user.name "silica-25"
git config user.email "288636233+silica-25@users.noreply.github.com"
```

---

## 触らなくていいもの

- `/notes` の内容 — note.com/sio2_25 の RSS からビルドのたびに自動取得
- `src/components/` `src/layouts/` — 見た目の共通パーツ(デザインを変えたいときだけ触る)
- `src/pages/hobbies/[slug].astro` — hobbies の項目から自動でページが作られる仕組み
- `src/data/feed.ts` — 同じ tag の log と写真を日付順に混ぜて並べる仕組み(/kakeibo, /hobbies/<slug> で使用)
- `src/styles/global.css` の「ページ移動をなめらかにする」部分 — ページを移動するときのフェードの動き(ヘッダーは動かず本文だけ入れ替わる)。
  対応していないブラウザでは普通に移動するだけです。無効にしたいときはその部分を削除してください。
- `astro.config.mjs` — リンクにマウスを乗せたときに次のページを先読みする設定
- `src/data/log/index.ts` `src/data/log/types.ts` — タグ別ファイルをまとめて並べ替える仕組み(新しいタグを増やすとき以外は触らなくてOK)
