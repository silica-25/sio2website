import type { LogEntry } from './types';
import { kakeiboLog } from './kakeibo';
import { taikoLog } from './taiko';
import { pokemonLog } from './pokemon';
import { musicLog } from './music';
import { etcLog } from './etc';

export type { LogEntry };

// タグ(趣味)ごとのログをここでまとめる。
// 新しい趣味を増やしたら、そのタグ用のファイルをこのフォルダに作って import・スプレッドを
// 1行足す(作り方は GUIDE.md 参照)。
export const log: LogEntry[] = [...kakeiboLog, ...taikoLog, ...pokemonLog, ...musicLog, ...etcLog];

// 各ページはこちらを使う。log を日付の新しい順に並べ替えたもの。
export const sortedLog = [...log].sort((a, b) => b.date.localeCompare(a.date));
