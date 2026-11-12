import type { LogEntry } from './types';

// MysHelf の開発ログ。/apps/myshelf の dev log に表示される。
// 配列のどこに足しても OK (順番は index.ts が日付で自動的に並べ替える)。
export const myshelfLog: LogEntry[] = [
  { date: '2026-11-12', tag: 'myshelf', text: 'MysHelf の開発を始めた。' },
];
