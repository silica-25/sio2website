// Spotify の共有リンク (https://open.spotify.com/track/xxxxx など) から、
// ジャケット画像や埋め込み用 URL を自動で取ってくる。
// Spotify が公開している oEmbed という仕組みを使うので、API キーなどの登録は不要。
export interface SpotifyOEmbed {
  thumbnailUrl: string | null;
  /** iframe に埋め込むための URL (kind: 'embed' 用) */
  iframeUrl: string | null;
  title: string | null;
}

const cache = new Map<string, SpotifyOEmbed | null>();

export async function getSpotifyOEmbed(url: string): Promise<SpotifyOEmbed | null> {
  if (!url.includes('open.spotify.com')) return null;
  if (cache.has(url)) return cache.get(url) ?? null;

  try {
    const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const result: SpotifyOEmbed = {
      thumbnailUrl: typeof data.thumbnail_url === 'string' ? data.thumbnail_url : null,
      iframeUrl: typeof data.iframe_url === 'string' ? data.iframe_url : null,
      title: typeof data.title === 'string' ? data.title : null,
    };
    cache.set(url, result);
    return result;
  } catch (e) {
    console.warn(`[spotify] 情報を取得できませんでした (${url}): ${e}`);
    cache.set(url, null);
    return null;
  }
}
