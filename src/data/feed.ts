import { sortedLog } from './log';
import { photos, type Photo } from './photos';
import { getSpotifyOEmbed } from './spotify';

export interface FeedItem {
  date: string;
  kind: 'text' | 'photo' | 'score' | 'link' | 'quote' | 'track' | 'embed';
  text?: string;
  photo?: Photo;
  url?: string;
  sub?: string;
  image?: string;
  /** track: ページ内でそのまま再生できるミニプレイヤーの埋め込み URL */
  embedUrl?: string;
  /** 自分用のひとことメモ */
  comment?: string;
}

// 指定した tag の「ひとこと(log)」と「写真」を、日付の新しい順に混ぜて並べる。
// /kakeibo や /hobbies/<slug> の記録ページで使う。
//
// track/embed で url に Spotify の共有リンク(https://open.spotify.com/track/xxxxx など、
// 埋め込みコードではなく普通のリンクでOK)を書いておくと、ジャケット画像や埋め込み用 URL を
// ビルド時に自動で取得する(image を手で書いていればそちらを優先する)。
// track はジャケットに加えて、ページ内でそのまま再生できるミニプレイヤーも一緒に出す。
export async function buildFeed(tag: string): Promise<FeedItem[]> {
  const logItems: FeedItem[] = await Promise.all(
    sortedLog
      .filter((l) => l.tag === tag)
      .map(async (l) => {
        let image = l.image;
        let url = l.url;
        let embedUrl: string | undefined;

        if (l.kind === 'track' && url) {
          const meta = await getSpotifyOEmbed(url);
          if (!image && meta?.thumbnailUrl) image = meta.thumbnailUrl;
          if (meta?.iframeUrl) embedUrl = meta.iframeUrl;
        }
        if (l.kind === 'embed' && url && !url.includes('/embed/')) {
          const meta = await getSpotifyOEmbed(url);
          if (meta?.iframeUrl) url = meta.iframeUrl;
        }

        return {
          date: l.date,
          kind: l.kind ?? 'text',
          text: l.text,
          url,
          sub: l.sub,
          image,
          embedUrl,
          comment: l.comment,
        };
      }),
  );

  const photoItems: FeedItem[] = photos
    .filter((p) => p.tag === tag)
    .map((p) => ({ date: p.date ?? '', kind: 'photo', photo: p }));

  return [...logItems, ...photoItems].sort((a, b) => b.date.localeCompare(a.date));
}
