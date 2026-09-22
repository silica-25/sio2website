// サイト全体で使う情報。ここを書き換えるだけで各ページに反映されます。
export const site = {
  name: 'sio2',
  title: 'sio2 | Personal Site',
  description: '趣味、家計簿アプリ、Note の記事など、雑多にあふれる個人サイト。',
  tagline: '雑多に、静かに、積んでいく。',
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
  summary: '自分用に作っている家計簿アプリ。',
  keyword: '家計簿',
  href: '',
};

// 趣味。TODO: 一言ずつ書き足す
export const hobbies = [
  { title: '音ゲー', note: '' },
  { title: '対戦ゲーム', note: '' },
  { title: 'ポケモン', note: '' },
  { title: '写真', note: '撮ったものは Photos に並べています。', href: '/photos' },
];

// 雑多なひとこと。新しいものを上に足していく。
export const log = [
  { date: '2026-09-19', tag: 'site', text: 'サイトの土台を作った。' },
  { date: '2026-09-19', tag: 'kakeibo', text: '家計簿アプリの開発は継続中。' },
];

export const timeline = [
  { year: '2025', text: '電気通信大学　Ⅰ類に入学' },
  { year: '2026', text: 'このサイトを公開' },
];
