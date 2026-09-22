import { site } from './site';

export interface NoteItem {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD (JST)
}

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  if (!m) return '';
  return m[1]
    .replace(/^<!\[CDATA\[|\]\]>$/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

const toJstDate = (s: string) => {
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return '';
  return new Date(d.getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
};

// ビルド時に Note の RSS を取り込む。取得に失敗しても空配列を返し、ビルドは止めない。
export async function getNotes(): Promise<NoteItem[]> {
  try {
    const res = await fetch(`https://note.com/${site.noteUser}/rss`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => ({
      title: tag(m[1], 'title'),
      url: tag(m[1], 'link'),
      date: toJstDate(tag(m[1], 'pubDate')),
    }));
  } catch (e) {
    console.warn(`[notes] Note の RSS を取得できませんでした: ${e}`);
    return [];
  }
}
