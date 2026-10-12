export interface LogEntry {
  date: string;
  tag: string;
  /** 何も指定しなければ 'text' (ふつうの一言)。他の形式は GUIDE.md 参照 */
  kind?: 'text' | 'score' | 'link' | 'quote' | 'track' | 'embed';
  /** text/score/link/quote/track の本文(形式によって使われ方が変わる。GUIDE.md 参照) */
  text: string;
  /** link/track/embed のリンク先・埋め込み先 URL */
  url?: string;
  /** track のアーティスト名、quote の出典、score の補足など */
  sub?: string;
  /** track のジャケット画像など。外部の画像 URL をそのまま貼れる */
  image?: string;
  /** 自分用のひとことメモ。text/sub とは別に、長めの感想などを書きたいとき */
  comment?: string;
}
