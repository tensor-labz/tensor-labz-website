import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import DOMPurify from 'dompurify';
import ReactIcon from './ReactIcon';
import { toYouTubeEmbed } from '../../../services/postService';
import { EASE_EXPO } from '../../../lib/motion';

export type DetailsMediaType =
  | 'image'
  | 'youtube'
  | 'video'
  | 'drive_image'
  | 'drive_video';

interface SocialLink {
  platform: string;
  url: string;
}

interface DetailsPageProps {
  /** Small mono kicker above the title, e.g. "◈ POST // TL.SYSTEMS". */
  kicker?: string;
  title: string;
  /** Inline element after the title (e.g. a crown badge). */
  titleBadge?: React.ReactNode;
  description?: string;
  tags?: string[];
  /** Small footer text in the hero (e.g. a date). */
  meta?: string;
  /** Back link. */
  back?: { to: string; label: string };
  /** Cover media shown in the display frame. */
  cover?: { url: string; mediaType: DetailsMediaType };
  coverLabel?: string;
  /** Action cluster in the metadata column (e.g. support / contact buttons). */
  actions?: React.ReactNode;
  socialLinks?: SocialLink[];
  /** Sanitized rich-text body. */
  contentHtml?: string;
  /** Extra sections after the body (post media / project gallery). */
  children?: React.ReactNode;
}

const SOCIAL_ICONS: Record<string, string> = {
  twitter: 'FaTwitter',
  x: 'FaTwitter',
  linkedin: 'FaLinkedinIn',
  facebook: 'FaFacebookF',
  instagram: 'FaInstagram',
  youtube: 'FaYoutube',
  whatsapp: 'FaWhatsapp',
  tiktok: 'FaTiktok',
};

function socialIcon(platform: string): string {
  const k = platform.toLowerCase();
  const match = Object.entries(SOCIAL_ICONS).find(([p]) => k.includes(p));
  return match?.[1] ?? 'FaGlobe';
}

/* ── Animated circuit / wiring SVG background ─────────────────────────── */
const CircuitTraces = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1200 560"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {[
      {
        d: 'M -20 90 L 110 90 L 110 170 L 260 170',
        w: 1.5,
        o: 0.12,
        r: 3,
        dur: '4s',
        begin: '0s',
        cr: 0.8,
      },
      {
        d: 'M -20 430 L 70 430 L 70 350 L 190 350 L 190 290',
        w: 1,
        o: 0.09,
        r: 2.5,
        dur: '5.5s',
        begin: '1.2s',
        cr: 0.6,
      },
      {
        d: 'M 1220 100 L 1090 100 L 1090 180 L 980 180',
        w: 1,
        o: 0.09,
        r: 2.5,
        dur: '4.8s',
        begin: '0.6s',
        cr: 0.6,
      },
      {
        d: 'M 1220 420 L 1120 420 L 1120 340 L 1010 340',
        w: 1,
        o: 0.07,
        r: 2,
        dur: '6s',
        begin: '2s',
        cr: 0.45,
      },
      {
        d: 'M 300 280 L 420 280 L 420 240 L 520 240',
        w: 1,
        o: 0.06,
        r: 1.5,
        dur: '3.5s',
        begin: '0.8s',
        cr: 0.35,
      },
    ].map((t, i) => (
      <g key={i}>
        <path
          d={t.d}
          stroke={`rgba(56,189,248,${t.o})`}
          strokeWidth={t.w}
          fill="none"
        />
        <circle r={t.r} fill={`rgba(56,189,248,${t.cr})`}>
          <animateMotion
            dur={t.dur}
            repeatCount="indefinite"
            begin={t.begin}
            path={t.d}
          />
        </circle>
      </g>
    ))}
    {[
      [110, 90],
      [110, 170],
      [70, 350],
      [190, 350],
      [1090, 100],
      [1090, 180],
      [1120, 340],
      [420, 280],
      [420, 240],
    ].map(([cx, cy], i) => (
      <g key={`node-${i}`}>
        <circle
          cx={cx}
          cy={cy}
          r="3.5"
          fill="none"
          stroke="rgba(56,189,248,0.20)"
          strokeWidth="1"
        />
        <circle cx={cx} cy={cy} r="1.5" fill="rgba(56,189,248,0.35)" />
      </g>
    ))}
  </svg>
);

const Cover = ({
  url,
  mediaType,
  title,
}: {
  url: string;
  mediaType: DetailsMediaType;
  title: string;
}) => {
  if (mediaType === 'youtube')
    return (
      <iframe
        src={toYouTubeEmbed(url)}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  if (mediaType === 'drive_video')
    return (
      <iframe
        src={url}
        title={title}
        className="w-full h-full"
        allow="autoplay"
        allowFullScreen
      />
    );
  if (mediaType === 'video')
    return (
      <video
        src={url}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    );
  return <img src={url} alt={title} className="w-full h-full object-cover" />;
};

/**
 * Shared detail page (post / project): engineering hero with cover display frame
 * + metadata column, then a rich-text body and optional extra sections.
 */
const DetailsPage: React.FC<DetailsPageProps> = memo(
  ({
    kicker,
    title,
    titleBadge,
    description,
    tags = [],
    meta,
    back,
    cover,
    coverLabel = 'TL.DISPLAY — COVER',
    actions,
    socialLinks = [],
    contentHtml,
    children,
  }) => (
    <>
      {/* ── Hero ── */}
      <div className="relative bg-slate-950 overflow-hidden pt-24 pb-14 lg:pt-32 lg:pb-20">
        <CircuitTraces />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(56,189,248,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_30%,rgba(2,6,23,0.65)_100%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* metadata */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE_EXPO }}
              className="flex flex-col gap-5 order-2 lg:order-1"
            >
              {kicker && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/80">
                    {kicker}
                  </p>
                </div>
              )}

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase
                        border border-accent/40 bg-accent/10 text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-bold font-display text-white leading-tight flex items-center gap-3">
                {title}
                {titleBadge}
              </h1>

              {description && (
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {description}
                </p>
              )}

              <div className="flex items-center gap-3 flex-wrap">
                {meta && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <ReactIcon name="FiCalendar" size={11} />
                    {meta}
                  </div>
                )}
                {socialLinks.map(({ platform, url }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="w-7 h-7 flex items-center justify-center rounded border border-white/15
                      bg-white/5 text-white/50 hover:text-accent hover:border-accent/50 transition-all duration-200"
                  >
                    <ReactIcon name={socialIcon(platform)} size={12} />
                  </a>
                ))}
              </div>

              {actions}

              {back && (
                <Link
                  to={back.to}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500
                    hover:text-accent transition-colors w-fit"
                >
                  <ReactIcon name="FiArrowLeft" size={11} /> {back.label}
                </Link>
              )}
            </motion.div>

            {/* cover display frame */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_EXPO }}
              className="relative order-1 lg:order-2"
            >
              {cover?.url ? (
                <div className="relative">
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/20 via-transparent to-accent/10 blur-sm" />
                  <div className="relative rounded-xl overflow-hidden border border-accent/30 bg-slate-900">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-accent/15 bg-slate-950/70">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[9px] font-mono text-accent/60 tracking-widest uppercase">
                          {coverLabel}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                        {cover.mediaType}
                      </span>
                    </div>

                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-950">
                      <Cover
                        url={cover.url}
                        mediaType={cover.mediaType}
                        title={title}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
                          backgroundSize: '36px 36px',
                        }}
                      />
                      <motion.div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent pointer-events-none"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: 'linear',
                          repeatDelay: 2.5,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between px-3 py-1.5 border-t border-accent/10 bg-slate-950/50">
                      <span className="text-[9px] font-mono text-slate-600">
                        ● LIVE
                      </span>
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-0.5 rounded-full bg-accent/30"
                            style={{ opacity: 0.2 + i * 0.18 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
                    <div
                      key={pos}
                      className={`absolute w-5 h-5 border-accent/60 pointer-events-none
                        ${pos === 'tl' ? '-top-1.5 -left-1.5 border-t-2 border-l-2' : ''}
                        ${pos === 'tr' ? '-top-1.5 -right-1.5 border-t-2 border-r-2' : ''}
                        ${pos === 'bl' ? '-bottom-1.5 -left-1.5 border-b-2 border-l-2' : ''}
                        ${pos === 'br' ? '-bottom-1.5 -right-1.5 border-b-2 border-r-2' : ''}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="aspect-[16/10] rounded-xl border border-accent/20 bg-slate-900/50 flex flex-col items-center justify-center gap-3">
                  <ReactIcon
                    name="FaNewspaper"
                    size={48}
                    className="text-accent/15"
                  />
                  <span className="text-[10px] font-mono text-slate-600 tracking-widest">
                    NO MEDIA
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-14">
        {description && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, ease: EASE_EXPO }}
            className="border-l-2 border-accent pl-4 mb-10 py-1"
          >
            <p className="text-muted text-sm leading-relaxed italic">
              {description}
            </p>
          </motion.div>
        )}

        {contentHtml && (
          <motion.div
            className="project-content prose-sm sm:prose max-w-none text-fg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: EASE_EXPO }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(contentHtml),
            }}
          />
        )}

        {children}

        {socialLinks.length > 0 && (
          <div className="mt-12 pt-6 border-t border-rim flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted">
              ◈ Share
            </span>
            {socialLinks.map(({ platform, url }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="w-8 h-8 flex items-center justify-center rounded border border-rim
                  bg-glass-bg text-muted hover:text-accent hover:border-accent/40 hover:bg-glass-raised
                  transition-all duration-200"
              >
                <ReactIcon name={socialIcon(platform)} size={14} />
              </a>
            ))}
          </div>
        )}
      </main>
    </>
  )
);

DetailsPage.displayName = 'DetailsPage';
export default DetailsPage;
