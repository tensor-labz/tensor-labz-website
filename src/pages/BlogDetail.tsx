import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import DOMPurify from 'dompurify';
import Page from '../components/resuable/Page';
import ReactIcon from '../shared/components/ui/ReactIcon';
import BlogMediaSection from '../features/blog/components/BlogMediaSection';
import { useBlogDetailController } from '../features/blog/hooks/useBlogDetailController';
import { toYouTubeEmbed } from '../services/blogService';
import { EASE_EXPO } from '../lib/motion';

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
    {/* Trace 1 — top-left branch */}
    <path d="M -20 90 L 110 90 L 110 170 L 260 170" stroke="rgba(56,189,248,0.12)" strokeWidth="1.5" fill="none" />
    <circle r="3" fill="rgba(56,189,248,0.8)">
      <animateMotion dur="4s" repeatCount="indefinite"
        path="M -20 90 L 110 90 L 110 170 L 260 170" />
    </circle>

    {/* Trace 2 — bottom-left branch */}
    <path d="M -20 430 L 70 430 L 70 350 L 190 350 L 190 290" stroke="rgba(56,189,248,0.09)" strokeWidth="1" fill="none" />
    <circle r="2.5" fill="rgba(56,189,248,0.6)">
      <animateMotion dur="5.5s" repeatCount="indefinite" begin="1.2s"
        path="M -20 430 L 70 430 L 70 350 L 190 350 L 190 290" />
    </circle>

    {/* Trace 3 — top-right branch */}
    <path d="M 1220 100 L 1090 100 L 1090 180 L 980 180" stroke="rgba(56,189,248,0.09)" strokeWidth="1" fill="none" />
    <circle r="2.5" fill="rgba(56,189,248,0.6)">
      <animateMotion dur="4.8s" repeatCount="indefinite" begin="0.6s"
        path="M 1220 100 L 1090 100 L 1090 180 L 980 180" />
    </circle>

    {/* Trace 4 — bottom-right branch */}
    <path d="M 1220 420 L 1120 420 L 1120 340 L 1010 340" stroke="rgba(56,189,248,0.07)" strokeWidth="1" fill="none" />
    <circle r="2" fill="rgba(56,189,248,0.45)">
      <animateMotion dur="6s" repeatCount="indefinite" begin="2s"
        path="M 1220 420 L 1120 420 L 1120 340 L 1010 340" />
    </circle>

    {/* Trace 5 — mid horizontal connector */}
    <path d="M 300 280 L 420 280 L 420 240 L 520 240" stroke="rgba(56,189,248,0.06)" strokeWidth="1" fill="none" />
    <circle r="1.5" fill="rgba(56,189,248,0.35)">
      <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.8s"
        path="M 300 280 L 420 280 L 420 240 L 520 240" />
    </circle>

    {/* Node dots at junctions */}
    {[
      [110, 90], [110, 170], [70, 350], [190, 350],
      [1090, 100], [1090, 180], [1120, 340], [420, 280], [420, 240],
    ].map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="3.5" fill="none" stroke="rgba(56,189,248,0.20)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="1.5" fill="rgba(56,189,248,0.35)" />
      </g>
    ))}
  </svg>
);

const BlogDetail: React.FC = memo(() => {
  const { blog, isLoading, notFound } = useBlogDetailController();

  if (isLoading) {
    return (
      <Page HeadProps={{ title: 'Loading…' }}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-[10px] font-mono tracking-widest uppercase text-accent/60">Loading article…</p>
          </div>
        </div>
      </Page>
    );
  }

  if (notFound || !blog) {
    return (
      <Page HeadProps={{ title: '404 — Article Not Found' }}>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-[10px] font-mono tracking-widest uppercase text-accent">◈ 404</p>
          <h1 className="text-3xl font-bold font-display text-fg">Article not found</h1>
          <p className="text-muted text-sm">This article may have been removed or is not yet published.</p>
          <Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline font-mono">
            <ReactIcon name="FiArrowLeft" size={14} /> Back to Blog
          </Link>
        </div>
      </Page>
    );
  }

  const socialLinks = blog.social_links;
  const date = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <Page HeadProps={{ title: blog.meta_title || blog.title }}>

      {/* ── Hero ── */}
      <div className="relative bg-slate-950 overflow-hidden pt-24 pb-14 lg:pt-32 lg:pb-20">
        {/* Animated circuit wiring */}
        <CircuitTraces />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(56,189,248,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_30%,rgba(2,6,23,0.65)_100%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Left: metadata ── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE_EXPO }}
              className="flex flex-col gap-5 order-2 lg:order-1"
            >
              {/* System label */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/80">
                  ◈ ARTICLE // TL.SYSTEMS
                </p>
              </div>

              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((tag) => (
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

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-bold font-display text-white leading-tight">
                {blog.title}
              </h1>

              {/* Description */}
              {blog.description && (
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {blog.description}
                </p>
              )}

              {/* Date + social links */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <ReactIcon name="FiCalendar" size={11} />
                  {date}
                </div>
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

              {/* Back link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500
                  hover:text-accent transition-colors w-fit"
              >
                <ReactIcon name="FiArrowLeft" size={11} /> Back to Blog
              </Link>
            </motion.div>

            {/* ── Right: Engineering display frame ── */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_EXPO }}
              className="relative order-1 lg:order-2"
            >
              {blog.cover_image ? (
                <div className="relative">
                  {/* Glow ring */}
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/20 via-transparent to-accent/10 blur-sm" />

                  {/* Frame shell */}
                  <div className="relative rounded-xl overflow-hidden border border-accent/30 bg-slate-900">

                    {/* Header bar */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-accent/15 bg-slate-950/70">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[9px] font-mono text-accent/60 tracking-widest uppercase">
                          TL.DISPLAY — COVER
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                        {blog.cover_media_type}
                      </span>
                    </div>

                    {/* Media */}
                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-950">
                      {blog.cover_media_type === 'youtube' && (
                        <iframe
                          src={toYouTubeEmbed(blog.cover_image)}
                          title={blog.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                      {blog.cover_media_type === 'drive_video' && (
                        <iframe
                          src={blog.cover_image}
                          title={blog.title}
                          className="w-full h-full"
                          allow="autoplay"
                          allowFullScreen
                        />
                      )}
                      {blog.cover_media_type === 'video' && (
                        <video
                          src={blog.cover_image}
                          autoPlay muted loop playsInline
                          className="w-full h-full object-cover"
                        />
                      )}
                      {(blog.cover_media_type === 'image' || blog.cover_media_type === 'drive_image') && (
                        <img
                          src={blog.cover_image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Engineering grid overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
                          backgroundSize: '36px 36px',
                        }}
                      />

                      {/* Scan line */}
                      <motion.div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent pointer-events-none"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
                      />
                    </div>

                    {/* Footer bar */}
                    <div className="flex items-center justify-between px-3 py-1.5 border-t border-accent/10 bg-slate-950/50">
                      <span className="text-[9px] font-mono text-slate-600">● LIVE</span>
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

                  {/* Corner brackets outside the frame */}
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

                  {/* Wire connector — decorative stub toward content */}
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1.5">
                    <div className="w-6 h-px bg-gradient-to-l from-accent/40 to-transparent" />
                    <div className="w-2 h-2 rounded-full border border-accent/50 bg-accent/15" />
                  </div>
                </div>
              ) : (
                <div className="aspect-[16/10] rounded-xl border border-accent/20 bg-slate-900/50
                  flex flex-col items-center justify-center gap-3">
                  <ReactIcon name="FaNewspaper" size={48} className="text-accent/15" />
                  <span className="text-[10px] font-mono text-slate-600 tracking-widest">NO MEDIA</span>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Article content ── */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-14">

        {/* Meta description callout */}
        {blog.description && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, ease: EASE_EXPO }}
            className="border-l-2 border-accent pl-4 mb-10 py-1"
          >
            <p className="text-muted text-sm leading-relaxed italic">{blog.description}</p>
          </motion.div>
        )}

        {/* Rich content */}
        {blog.content && (
          <motion.div
            className="project-content prose-sm sm:prose max-w-none text-fg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: EASE_EXPO }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
          />
        )}

        {/* Media gallery */}
        <BlogMediaSection media={blog.additional_media} />

        {/* Social share footer */}
        {socialLinks.length > 0 && (
          <div className="mt-12 pt-6 border-t border-rim flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted">◈ Share</span>
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
    </Page>
  );
});

BlogDetail.displayName = 'BlogDetail';
export default BlogDetail;
