import type { ImageMetadata } from 'astro';
import { photoComments } from './site';

export interface Photo {
  src: ImageMetadata;
  /** ファイル名が YYYY-MM-DD で始まっていれば、その日付 */
  date?: string;
  /** ファイル名から作るキャプション(吹き出しの中身になる) */
  caption: string;
  /** サブフォルダに入れた場合、そのフォルダ名。log の tag と合わせると
   *  /kakeibo や /hobbies/<slug> のログにも一緒に並ぶ */
  tag?: string;
  /** site.ts の photoComments にキャプションと同じキーがあれば入る、自分用のひとことメモ */
  comment?: string;
}

// src/assets/photos/ 直下、または src/assets/photos/<tag>/ に画像を置くと自動で拾われる。
// サブフォルダに入れるとフォルダ名が tag になる (例: photos/kakeibo/x.jpg → tag: 'kakeibo')。
// ファイル名を「2026-09-19_花火.jpg」のようにすると、日付とキャプションに分かれる。
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

const DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})[_-]?/;

export const photos: Photo[] = Object.entries(modules)
  .map(([path, mod]) => {
    const rel = path.replace('../assets/photos/', '');
    const parts = rel.split('/');
    const tag = parts.length > 1 ? parts[0] : undefined;
    const filename = parts[parts.length - 1];
    const base = filename.replace(/\.[^.]+$/, '');
    const m = base.match(DATE_PREFIX);
    const date = m?.[1];
    const rest = (date ? base.slice(m[0].length) : base).replace(/[_-]+/g, ' ').trim();
    const caption = rest || base;
    return { src: mod.default, date, caption, tag, comment: photoComments[caption], sortKey: date ?? base };
  })
  // 日付(なければファイル名)の新しい順。タグの有無に関わらず /photos では時系列で並ぶ。
  .sort((a, b) => b.sortKey.localeCompare(a.sortKey))
  .map(({ sortKey, ...photo }) => photo);
