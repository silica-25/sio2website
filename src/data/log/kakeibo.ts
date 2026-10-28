import type { LogEntry } from './types';

// 家計簿アプリの開発ログ。/kakeibo の dev log に表示される。
// 配列のどこに足しても OK (順番は index.ts が日付で自動的に並べ替える)。
export const kakeiboLog: LogEntry[] = [
  { date: '2026-08-28', tag: 'kakeibo', text: '家計簿アプリのクローズドテストの開始。' },
  { date: '2026-09-18', tag: 'kakeibo', text: '家計簿アプリの正規版の公開申請をした。' },
  { date: '2026-10-10', tag: 'kakeibo', text: '製品版の公開をした。' },
  { date: '2026-10-16', tag: 'kakeibo', text: '不具合の修正をしたアップデートを配信。' },
];
