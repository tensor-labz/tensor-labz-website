import React, { memo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import type { Post, CoverMediaType } from '../../../services/postService';
import { EASE_EXPO } from '../../../lib/motion';

type Props = Pick<Post, 'slug' | 'title' | 'description' | 'cover_image' | 'cover_media_type' | 'tags' | 'created_at'> & {
  reverse?: boolean;
};

function youtubeThumbnail(url: string): string {
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return `https://img.youtube.com/vi/${short[1]}/hqdefault.jpg`;
  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch) return `https://img.youtube.com/vi/${watch[1]}/hqdefault.jpg`;
  const embed = url.match(/embed\/([^?&/]+)/);
  if (embed) return `https://img.youtube.com/vi/${embed[1]}/hqdefault.jpg`;
  return '';
}

const CoverPreview = ({ url, type, title }: { url: string; type: CoverMediaType; title: string }) => {
  if (type === 'youtube') {
    const thumb = youtubeThumbnail(url);
    return thumb ? (
      <div className="relative w-full h-full">
        <img src={thumb} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <ReactIcon name="FaYoutube" size={18} className="text-red-500" />
          </div>
        </div>
      </div>
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-slate-900">
        <ReactIcon name="FaYoutube" size={32} className="text-red-500/60" />
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className="relative w-full h-full">
        <video src={url} muted preload="metadata" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <ReactIcon name="FaPlay" size={12} className="text-white ml-0.5" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'drive_video') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-900">
        <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
          <ReactIcon name="FaPlay" size={12} className="text-accent ml-0.5" />
        </div>
        <span className="text-[10px] font-mono text-muted/50 tracking-widest">DRIVE VIDEO</span>
      </div>
    );
  }

  /* image / drive_image */
  return (
    <img src={url} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
  );
};

const PostCard: React.FC<Props> = memo(({ slug, title, description, cover_image, cover_media_type, tags, created_at, reverse = false }) => {
  const navigate = useNavigate();
  const date = created_at
    ? new Date(created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE_EXPO }}
      onClick={() => navigate(`/posts/${slug}`)}
      className={`group relative flex flex-col overflow-hidden rounded-xl
        bg-surface border border-rim cursor-pointer
        hover:border-accent/40 hover:shadow-[0_8px_40px_-8px_rgba(56,189,248,0.12)]
        transition-all duration-300
        ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {/* ── Cover media ── */}
      <div className="relative aspect-video md:aspect-auto md:w-[44%] md:shrink-0 overflow-hidden bg-raised">
        {cover_image ? (
          <CoverPreview url={cover_image} type={cover_media_type} title={title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ReactIcon name="FaNewspaper" size={40} className="text-muted/20" />
          </div>
        )}

        {/* Engineering grid on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Gradient fade toward content side */}
        <div
          className={`absolute inset-0 transition-opacity duration-300
            bg-gradient-to-t from-slate-950/50 via-transparent to-transparent
            md:bg-gradient-to-t md:from-transparent
            ${reverse
              ? 'md:bg-gradient-to-l md:from-slate-950/25 md:to-transparent'
              : 'md:bg-gradient-to-r md:from-transparent md:to-slate-950/25'
            }`}
        />

        {/* Live badge */}
        <div className="hidden md:flex absolute top-4 left-4 items-center gap-1.5
          px-2 py-0.5 rounded border border-accent/40 bg-black/60 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest uppercase text-accent">Article</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 md:p-8 lg:p-10 gap-3 md:gap-4 md:justify-center">

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase
                  border border-accent/25 bg-accent/5 text-accent"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-[10px] font-mono text-muted/50 self-center">+{tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-display text-fg leading-snug
          group-hover:text-accent transition-colors duration-200 line-clamp-2 md:line-clamp-3">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-sm md:text-[15px] text-muted leading-relaxed line-clamp-2 md:line-clamp-3">
            {description}
          </p>
        )}

        {/* Separator */}
        <div className="hidden md:block h-px bg-gradient-to-r from-accent/20 via-rim to-transparent" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 md:pt-0 border-t border-rim md:border-0 mt-auto md:mt-0">
          <span className="text-[10px] font-mono text-muted/50">{date}</span>
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-accent/70
            group-hover:text-accent transition-colors duration-200">
            Read Article
            <ReactIcon
              name="FiArrowRight"
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </span>
        </div>
      </div>

      {/* Corner brackets */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
        <div
          key={pos}
          className={`absolute w-3 h-3 border-accent/30 pointer-events-none z-10
            opacity-0 group-hover:opacity-100 transition-all duration-300
            group-hover:w-4 group-hover:h-4 group-hover:border-accent/70
            ${pos === 'tl' ? 'top-2 left-2 border-t border-l' : ''}
            ${pos === 'tr' ? 'top-2 right-2 border-t border-r' : ''}
            ${pos === 'bl' ? 'bottom-2 left-2 border-b border-l' : ''}
            ${pos === 'br' ? 'bottom-2 right-2 border-b border-r' : ''}`}
        />
      ))}
    </motion.article>
  );
});

PostCard.displayName = 'PostCard';
export default PostCard;
