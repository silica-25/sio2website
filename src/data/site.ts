// サイト全体で使う情報。ここを書き換えるだけで各ページに反映されます。
export const site = {
  name: 'sio2',
  // 左上(ヘッダー)のロゴ文字。トップの大きな名前やフッターは name のまま
  brand: 'sio2_website',
  title: 'sio2 | Personal Site',
  description: '二酸化ケイ素の個人サイト。',
  tagline: '人生とは孤独である',
  // About ページの自己紹介文。ここを書き換えるだけで /about に反映される
  bio: 'ひとりでバイトばっかりしてる理系大学生。サークルにも部活にも所属していないため人脈が少ない。',
  email: 'silica.o2.25@gmail.com',
  noteUser: 'sio2_25',
  links: [
    { label: 'Note', href: 'https://note.com/sio2_25' },
    { label: 'GitHub', href: 'https://github.com/silica-25' },
    { label: 'X', href: 'https://x.com/sekinopoint' },
  ],
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Kakeibo', href: '/kakeibo' },
  { label: 'Hobbies', href: '/hobbies' },
  { label: 'Photos', href: '/photos' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
];

// 家計簿アプリ。詳しい話は Note に書いて、タイトルに「家計簿」を含む記事がこのページに自動で並ぶ。
export const kakeibo = {
  name: '家計簿アプリ',
  status: '開発中',
  summary: '家計簿アプリ。個人用からリリースしました。現在はAndroid版のみです。',
  keyword: '家計簿',
  href: '',
};

export interface Hobby {
  title: string;
  note: string;
  /** 指定すると /hobbies/<slug> に記録ページができる */
  slug?: string;
  /** log の tag と一致させると、そのタグの記録が記録ページに並ぶ */
  tag?: string;
  /** 記録ページの説明文。空なら note だけ表示 */
  body?: string;
  /** 記録ページを作らず、代わりにリンクさせたい先(写真など) */
  href?: string;
}

// 趣味。note と body は空でも OK (空なら記録ページに何も出ないだけ)。
// slug を付けたものはクリックすると /hobbies/<slug> の記録ページに飛ぶ。
export const hobbies: Hobby[] = [
  { title: '太鼓の達人', note: '', slug: 'taiko', tag: 'taiko', body: '' },
  { title: 'ポケモン', note: '', slug: 'pokemon', tag: 'pokemon', body: '' },
  { title: '音楽', note: '', slug: 'music', tag: 'music', body: '' },
  { title: 'その他', note: '', slug: 'etc', tag: 'etc', body: '' },
  { title: '写真', note: '撮ったものは Photos に並べています。', href: '/photos' },
];

// ログ(雑多なひとこと)は src/data/log/ フォルダに、趣味ごとのファイルへ分けて置いてあります。
// 増やすときは src/data/log/<tag>.ts を編集してください(書き方は GUIDE.md 参照)。

// /hobbies/music の上部に出す「今聴いてる曲」。enabled を true にすると表示される。
export const nowPlaying = {
  enabled: false,
  title: '',
  artist: '',
  url: '',
  cover: '',
};

// /hobbies/music 用の設定
export const music = {
  summary: '聴いてる曲のなかでもオススメを共有する場所。RAPSTARきっかけで聞く人が多い。',
  // Spotify/YouTube の「埋め込み(embed)」用 URL を入れると、ページ下部にプレイヤーが埋め込まれる
  embedUrl: '',
};

// 写真に自分用のコメントを付けたいとき。キーはファイル名(拡張子・日付部分を除いた部分)。
// 例: src/assets/photos/taiko/2026-07-14_合格画像.png ならキーは '合格画像'
export const photoComments: Record<string, string> = {
  // '合格画像': 'ここにコメント',
};

export interface Certification {
  /** 取得した年月など (例: '2026-03')。空でも OK */
  date?: string;
  name: string;
  /** 点数や級などの補足 (例: '合格' '600点')。空でも OK */
  note?: string;
}

// 資格・検定。About ページの右側に出る。0件のときは枠ごと表示されない。
// 例: { date: '2026-03', name: '基本情報技術者試験', note: '合格' },
export const certifications: Certification[] = [
  { date: '2026-03', name: '基本情報技術者試験', note: '合格' },
  { name: '実用英語技能検定', note: '2級' },
  { name: '日本漢字能力検定', note: '準2級' },
];

export const timeline = [
  { year: '2025', text: '電気通信大学　Ⅰ類に入学' },
  { year: '2026-10-10', text: '家計簿アプリ「家ケイ簿」、公開' },
  { year: '2026-10-13', text: 'このサイトを改修して公開' },
  { year: '2026-10-28', text: 'FEに合格' },
]
