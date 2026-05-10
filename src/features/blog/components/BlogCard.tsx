import React, { memo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import type { Blog } from '../../../services/blogService';
import { EASE_EXPO } from '../../../lib/motion';

type Props = Pick<Blog, 'slug' | 'title' | 'description' | 'cover_image' | 'tags' | 'created_at'>;

const BlogCard: React.FC<Props> = memo(({ slug, title, description, cover_image, tags, created_at }) => {
  const navigate = useNavigate();
  const date = created_at ? new Date(created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE_EXPO }}
      onClick={() => navigate(`/blog/${slug}`)}
      className="group relative flex flex-col rounded-xl overflow-hidden
        bg-surface border border-rim cursor-pointer
        hover:border-accent/40 hover:shadow-[0_8px_32px_-8px_rgba(56,189,248,0.12)]
        transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden bg-raised">
        {cover_image ? (
          <img
            src={cover_image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ReactIcon name="FaNewspaper" size={32} className="text-muted/30" />
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase
                  border border-accent/25 bg-accent/5 text-accent"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-[10px] font-mono text-muted/60 self-center">+{tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="text-base sm:text-lg font-bold font-display text-fg leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {title}
        </h2>

        {/* Description excerpt */}
        {description && (
          <p className="text-sm text-muted leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-rim mt-auto">
          <span className="text-[10px] font-mono text-muted/60">{date}</span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-accent/80 group-hover:text-accent transition-colors">
            Read Article
            <ReactIcon name="FiArrowRight" size={11} className="group-hover:translate-x-0.5 transition-transform" />
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

BlogCard.displayName = 'BlogCard';
export default BlogCard;
