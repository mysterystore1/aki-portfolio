import Link from 'next/link';
import { notFound } from 'next/navigation';
import LandingScript from '@/components/landing/LandingScript';
import HeroPhoto from '@/components/landing/HeroPhoto';
import ActivityGallery from '@/components/landing/ActivityGallery';
import TweetEmbed, { TwitterWidgetsScript } from '@/components/landing/TweetEmbed';
import { isLocale, type Locale } from '@/lib/i18n';
import { getLatestTweets, getTweetIdsFromEnv, getTweetOEmbeds, tweetUrl, type XTweet } from '@/lib/x-api';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="inline-block h-[14px] w-[14px] shrink-0 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/** 表示用にテキストを短くする（約80文字） */
function truncateTweetText(text: string, maxLen = 80): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen) + '…';
}

const FALLBACK_TWEETS: { id: string; text: string; tag: string }[] = [
  { id: '1991436077920567426', text: 'Zeus Network JPとのコラボ投稿。日本市場向けにZeusのプロダクトを紹介しています。', tag: 'Zeus Network' },
  { id: '1976083871675580578', text: 'Mantle「Max out Szn」クリエイターコンペでトップ表彰。2000人以上の応募者から選出されました。', tag: 'Mantle' },
  { id: '1888149044922617963', text: 'SoSoValueイベントのMC・コーディネーターを担当。日本でのWeb3イベント運営の様子をレポート。', tag: 'SoSoValue' }
];

const ACTIVITY_GALLERY = Array.from({ length: 12 }, (_, i) => {
  const index = String(i + 1).padStart(2, '0');
  return {
    src: `/images/gallery/activity-${index}.png`,
    title: `Activity ${index}`,
    note: 'イベント・AMA・コミュニティ活動'
  };
});

export default async function LandingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  const xTweets = await getLatestTweets(3);
  const tweets: { id: string; text: string; tag: string }[] | null = xTweets
    ? xTweets.map((t: XTweet) => ({
        id: t.id,
        text: truncateTweetText(t.text),
        tag: t.tag ?? 'Post'
      }))
    : null;

  const tweetIds = getTweetIdsFromEnv();
  const oEmbeds = tweets ? [] : await getTweetOEmbeds(tweetIds);
  const useEmbedMode = oEmbeds.length > 0;
  const displayTweets = useEmbedMode ? [] : (tweets ?? FALLBACK_TWEETS);

  return (
    <>
      <LandingScript />

      <nav id="landing-nav">
        <Link href={`/${resolvedLocale}/landing`} className="nav-logo">
          Aki<span>.</span>
        </Link>
        <ul className="nav-links">
          <li><Link href={`/${resolvedLocale}/landing#posts`}>Posts</Link></li>
          <li><Link href={`/${resolvedLocale}/landing#gallery`}>Gallery</Link></li>
          <li><Link href={`/${resolvedLocale}/landing#highlights`}>Highlights</Link></li>
          <li><Link href={`/${resolvedLocale}/landing#experience`}>Experience</Link></li>
          <li><Link href={`/${resolvedLocale}/landing#past`}>Achievements</Link></li>
        </ul>
        <Link href={`/${resolvedLocale}/landing#contact`} className="nav-contact">Contact</Link>
      </nav>

      <section className="hero">
        <div className="hero-deco1" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-mascot-transparent.png" alt="" className="hero-mascot" />
        </div>
        <div className="hero-deco2" aria-hidden />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-label"><span className="dot" /> Japanese Crypto KOL</div>
            <h1 className="hero-name">Hello,<br />I&apos;m <em>Aki</em></h1>
            <p className="hero-sub">クリプト KOL ・ MC ・ コンテンツクリエイター</p>
            <div className="hero-tags">
              <span className="hero-tag">KOL</span>
              <span className="hero-tag">MC / Host</span>
              <span className="hero-tag">Event Coordinator</span>
              <span className="hero-tag">Content Creator</span>
            </div>
            <p className="hero-desc">
              2021年より、DeFi・チェーン・ブロックチェーンゲームを楽しくわかりやすく解説しています。
            </p>
            <div className="hero-btns">
              <a href="https://x.com/aki_playaxie" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <XIcon /> Follow on X
              </a>
              <a href="https://www.youtube.com/@nft4142" target="_blank" rel="noopener noreferrer" className="btn-ghost">YouTube ↗</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="photo-frame">
              <HeroPhoto />
            </div>
            <div className="fbadge fb1">
              <div><div className="num">10,000+</div><div className="lbl">X Followers</div></div>
            </div>
            <div className="fbadge fb2">
              <div><div className="num">3,000+</div><div className="lbl">YouTube</div></div>
            </div>
            <div className="fbadge fb3">
              <div><div className="num">50+</div><div className="lbl">AMA Sessions</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat"><div className="stat-num">10,000+</div><div className="stat-label">X Followers</div></div>
          <div className="stat"><div className="stat-num">3,000+</div><div className="stat-label">YouTube</div></div>
          <div className="stat"><div className="stat-num">50+</div><div className="stat-label">AMA / Year</div></div>
          <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Avg Listeners</div></div>
          <div className="stat"><div className="stat-num">1,000+</div><div className="stat-label">Avg Comments</div></div>
        </div>
      </div>

      <section className="gallery-section" id="gallery">
        <div className="gallery-inner">
          <div className="sec-label reveal">Activity Gallery</div>
          <h2 className="sec-heading reveal">My Activities in Photos</h2>
          <p className="gallery-note reveal">活動写真（イベント・AMA・コミュニティ等）</p>
          <ActivityGallery items={ACTIVITY_GALLERY} />
        </div>
      </section>

      <div className="posts-section" id="posts">
        <div className="posts-inner">
          <div className="posts-header reveal">
            <div>
              <div className="sec-label">Latest Posts</div>
              <h2 className="sec-heading">From X / Twitter</h2>
            </div>
            <a href="https://x.com/aki_playaxie" target="_blank" rel="noopener noreferrer" className="posts-link">
              <XIcon /> @aki_playaxie
            </a>
          </div>
          {useEmbedMode ? (
            <>
              <TwitterWidgetsScript />
              <div className="posts-grid reveal posts-grid-embed">
                {oEmbeds.map(({ id, html }) => (
                  <TweetEmbed key={id} html={html} />
                ))}
              </div>
            </>
          ) : (
            <div className="posts-grid reveal">
              {displayTweets.map((tweet) => (
                <a
                  key={tweet.id}
                  href={tweetUrl(tweet.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tweet-card"
                >
                  <div className="tweet-header">
                    <div className="tweet-avatar">A</div>
                    <div>
                      <div className="tweet-name">Aki ✨</div>
                      <div className="tweet-handle">@aki_playaxie</div>
                    </div>
                  </div>
                  <div className="tweet-body">{tweet.text}</div>
                  <div className="tweet-footer">
                    <span className="tweet-tag">{tweet.tag}</span>
                    <span className="tweet-arrow">→</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hl-section" id="highlights">
        <div className="hl-inner">
          <div className="sec-label reveal">Highlights</div>
          <h2 className="sec-heading reveal">What I Do Best</h2>
          <div className="hl-grid">
            <div className="hl-card reveal">
              <div className="hl-emoji">🎙️</div>
              <h3 className="hl-title">AMA Host / MC</h3>
              <div className="hl-org">boarding bridge</div>
              <p className="hl-desc">日本最大級クリプトDAOでAMAホスト・MCを担当。Uniswap Labs、Monad、0G Labs等と対談。</p>
              <div className="hl-metric"><span className="hl-num">1,000+</span><span className="hl-lbl">avg comments / AMA</span></div>
            </div>
            <div className="hl-card reveal">
              <div className="hl-emoji">🌏</div>
              <h3 className="hl-title">Community & BD</h3>
              <div className="hl-org">StakeStone JP Ambassador</div>
              <p className="hl-desc">公式Xを0→1,200フォロワーに。6カ国中フォロワー数最大を記録。</p>
              <div className="hl-metric"><span className="hl-num">#1</span><span className="hl-lbl">largest community globally</span></div>
            </div>
            <div className="hl-card reveal">
              <div className="hl-emoji">🏆</div>
              <h3 className="hl-title">Content Creator</h3>
              <div className="hl-org">Mantle Top Creator</div>
              <p className="hl-desc">応募2000人以上の中からトップ表彰。ポルトガルCCCCへ選出。</p>
              <div className="hl-metric"><span className="hl-num">Top 1</span><span className="hl-lbl">of 2000+ applicants</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-label">AMA & Collaboration Partners</div>
        <div className="marquee-track" aria-hidden>
          {(() => {
            const partners = [
              'Uniswap Labs', 'Monad', '0G Labs', 'Huma Finance', 'Solayer', 'StakeStone',
              'Zeus Network', 'SoSoValue', 'TalusLabs', 'Wallchain', 'UPCX', 'Mantle'
            ];
            return [...partners, ...partners].map((name, i) => (
              <span key={`mq-${i}`} className="mq-item">{name} <span className="d" /></span>
            ));
          })()}
        </div>
      </div>

      <div className="tl-section" id="experience">
        <div className="tl-inner">
          <div className="sec-label reveal">Experience</div>
          <h2 className="sec-heading reveal">Career Timeline</h2>
          <div className="timeline">
            <div className="tl-item reveal">
              <div className="tl-date">2026/1 – Present</div>
              <h3 className="tl-title"><a href="https://mantle.xyz" target="_blank" rel="noopener noreferrer">Mantle Japan</a></h3>
              <div className="tl-role">Intern</div>
              <p className="tl-desc">厳正な選考を経てMantle Japanインターン3名の1人として選出。主にライブ配信・コンテンツ制作を担当。Mantle Squadの一員として、日本のクリプト界隈のクリエイティビティとパッションを世界に発信。</p>
              <div className="tl-tags"><span className="tl-tag">Mantle</span><span className="tl-tag">Live Streaming</span><span className="tl-tag">Content Creation</span><span className="tl-tag">Intern</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">2025/10 – Present</div>
              <h3 className="tl-title"><a href="https://t.me/infofi_hub" target="_blank" rel="noopener noreferrer">InfoFi Community</a></h3>
              <div className="tl-role">Core Member</div>
              <p className="tl-desc">日本初のInfoFiコミュニティのコアメンバーとして在籍。2か月で約600名まで拡大したコミュニティで、韓国コミュニティとの共同運営・7回のAMA実施に参画。2026年2月の日本初InfoFiオフイベントを予定。</p>
              <div className="tl-tags"><span className="tl-tag">InfoFi</span><span className="tl-tag">Community Building</span><span className="tl-tag">JP × KR</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">2024/10 – Present</div>
              <h3 className="tl-title"><a href="https://x.com/bb_jpdao" target="_blank" rel="noopener noreferrer">boarding bridge</a></h3>
              <div className="tl-role">Officer / AMA Host / MC</div>
              <p className="tl-desc">日本最大級クリプトDAOのOfficerとして、日英でAMAホスト・MCを月約3回。平均リスナー約500名、平均コメント数1,000件を記録。</p>
              <div className="tl-tags"><span className="tl-tag">AMA</span><span className="tl-tag">MC</span><span className="tl-tag">Bilingual</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">2023/2 – Present</div>
              <h3 className="tl-title"><a href="https://x.com/StakeStone_JP" target="_blank" rel="noopener noreferrer">StakeStone JP</a></h3>
              <div className="tl-role">Ambassador / Community & BD</div>
              <p className="tl-desc">DeFi領域で日本コミュニティを0から構築。公式X (0→1,200)、オフイベント「StakeStone Connect」計5回・累計150名動員。TGE前ステーキング量で日本最大を達成。</p>
              <div className="tl-tags"><span className="tl-tag">DeFi</span><span className="tl-tag">Community</span><span className="tl-tag">BD</span><span className="tl-tag">Events</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">2021/11 – Present</div>
              <h3 className="tl-title"><a href="https://www.youtube.com/@nft4142" target="_blank" rel="noopener noreferrer">YouTuber</a> / <a href="https://x.com/aki_playaxie" target="_blank" rel="noopener noreferrer">X (KOL)</a></h3>
              <div className="tl-role">Content Creator</div>
              <p className="tl-desc">コスプレ・コメディ要素を交えた独自スタイルでDeFi・チェーン・ブロックチェーンゲームを解説。Mantleクリエイターコンペでトップ表彰（応募2000人以上）、ポルトガルCCCCへ選出。</p>
              <div className="tl-tags"><span className="tl-tag">YouTube</span><span className="tl-tag">X</span><span className="tl-tag">Cosplay</span><span className="tl-tag">Comedy</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="past-section" id="past">
        <div className="past-inner">
          <div className="sec-label reveal">Past</div>
          <h2 className="sec-heading reveal">Past Achievements</h2>
          <div className="past-grid">
            <div className="past-card reveal">
              <div className="past-yr">&apos;22</div>
              <div><div className="past-title">東京ゲームショウ 登壇</div><p className="past-desc">日本最大級ゲームカンファレンスでWeb3ゲーム（STEPN等）をKOLとして紹介。</p></div>
            </div>
            <div className="past-card reveal">
              <div className="past-yr">&apos;21</div>
              <div><div className="past-title">Axie Scholars 運用</div><p className="past-desc">フィリピン人スカラー100名超を運用。NFTマッチング設計、戦略構築、個別コーチング。</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section" id="contact">
        <h2 className="cta-heading reveal">Let&apos;s Connect</h2>
        <p className="cta-desc reveal">イベントMC・コーディネート・AMAホスト・日本コミュニティ立ち上げなど、お気軽にご連絡ください。</p>
        <div className="cta-btns reveal">
          <a href="https://x.com/aki_playaxie" className="cta-btn fill" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          <a href="https://www.youtube.com/@nft4142" className="cta-btn line" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://x.com/StakeStone_JP" className="cta-btn line" target="_blank" rel="noopener noreferrer">StakeStone JP</a>
        </div>
      </div>

      <footer>
        <p>© 2026 Aki — Japanese Crypto KOL / MC / Event Coordinator</p>
      </footer>
    </>
  );
}
