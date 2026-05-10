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

/* Platform → react-icon name mapping (same pattern as Footer) */
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
      <div className="relative min-h-[45vh] flex items-end overflow-hidden bg-raised">
        {blog.cover_image && (blog.cover_media_type === 'image' || blog.cover_media_type === 'drive_image') && (
          <motion.img
            src={blog.cover_image}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
          />
        )}
        {blog.cover_image && blog.cover_media_type === 'youtube' && (
          <iframe
            src={toYouTubeEmbed(blog.cover_image)}
            title={blog.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {blog.cover_image && blog.cover_media_type === 'drive_video' && (
          <iframe
            src={blog.cover_image}
            title={blog.title}
            className="absolute inset-0 w-full h-full"
            allow="autoplay"
            allowFullScreen
          />
        )}
        {blog.cover_image && blog.cover_media_type === 'video' && (
          <video
            src={blog.cover_image}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />
        {/* Engineering grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Hero content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto w-full px-6 lg:px-8 pb-10 pt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: EASE_EXPO }}
        >
          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border border-accent/40 bg-accent/10 text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-2xl sm:text-4xl font-bold font-display text-white mb-4 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[10px] font-mono text-white/60">{date}</span>
            {/* Social links */}
            {socialLinks.map(({ platform, url }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="w-7 h-7 flex items-center justify-center rounded border border-white/20 bg-white/10 text-white/70 hover:text-accent hover:border-accent/50 transition-all duration-200"
              >
                <ReactIcon name={socialIcon(platform)} size={12} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-12">

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted hover:text-accent transition-colors mb-8"
        >
          <ReactIcon name="FiArrowLeft" size={12} /> Back to Blog
        </Link>

        {/* Meta description (shown as a callout if present) */}
        {blog.description && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, ease: EASE_EXPO }}
            className="border-l-2 border-accent pl-4 mb-8 py-1"
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

        {/* Media section — images / videos after content */}
        <BlogMediaSection images={blog.additional_images} videos={blog.additional_videos} />

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
                className="w-8 h-8 flex items-center justify-center rounded border border-rim bg-glass-bg text-muted hover:text-accent hover:border-accent/40 hover:bg-glass-raised transition-all duration-200"
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
