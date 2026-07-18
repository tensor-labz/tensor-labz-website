import React, { memo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ReactIcon from './ReactIcon';
import { EASE_EXPO } from '../../../lib/motion';

export interface ContentCardProps {
  id: string | number;
  title: string;
  imgUrl?: string;
  tags?: string[];
  description?: string;
  /** Click destination. */
  link: string;
  /** ISO date string; shown formatted in the footer. */
  created_at?: string;
  /** Mirror the layout (image on the right). */
  reverse?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = memo(
  ({
    title,
    imgUrl,
    tags = [],
    description,
    link,
    created_at,
    reverse = false,
  }) => {
    const navigate = useNavigate();
    const date = created_at
      ? new Date(created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '';

    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: EASE_EXPO }}
        onClick={() => navigate(link)}
        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-rim bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_40px_-8px_rgba(56,189,248,0.12)] md:h-56 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
        {/* ── Cover ── */}
        <div className="relative h-40 overflow-hidden bg-raised sm:h-48 md:h-auto md:w-[38%] md:shrink-0">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ReactIcon
                name="FaNewspaper"
                size={40}
                className="text-muted/20"
              />
            </div>
          )}

          {/* Engineering grid on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage:
                'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Gradient fade toward content side */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent transition-opacity duration-300 md:bg-gradient-to-t md:from-transparent ${
              reverse
                ? 'md:bg-gradient-to-l md:from-slate-950/25 md:to-transparent'
                : 'md:bg-gradient-to-r md:from-transparent md:to-slate-950/25'
            }`}
          />
        </div>

        {/* ── Content ── */}
        <div className="flex flex-1 flex-col gap-2.5 p-4 md:justify-center md:p-6">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-accent/25 bg-accent/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="self-center font-mono text-[10px] text-muted/50">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}

          <h2 className="line-clamp-2 font-display text-sm font-bold leading-snug text-fg transition-colors duration-200 group-hover:text-accent md:text-base lg:text-lg">
            {title}
          </h2>

          {description && (
            <p className="line-clamp-2 text-[13px] leading-relaxed text-muted md:text-sm">
              {description}
            </p>
          )}

          <div className="hidden h-px bg-gradient-to-r from-accent/20 via-rim to-transparent md:block" />

          <div className="mt-auto flex items-center justify-between border-t border-rim pt-2 md:mt-0 md:border-0 md:pt-0">
            <span className="font-mono text-[10px] text-muted/50">{date}</span>
            <ReactIcon
              name="FiArrowRight"
              size={14}
              className="text-accent/70 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
            />
          </div>
        </div>

        {/* Corner brackets */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
          <div
            key={pos}
            className={`pointer-events-none absolute z-10 h-3 w-3 border-accent/30 opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:border-accent/70 group-hover:opacity-100 ${pos === 'tl' ? 'left-2 top-2 border-l border-t' : ''} ${pos === 'tr' ? 'right-2 top-2 border-r border-t' : ''} ${pos === 'bl' ? 'bottom-2 left-2 border-b border-l' : ''} ${pos === 'br' ? 'bottom-2 right-2 border-b border-r' : ''}`}
          />
        ))}
      </motion.article>
    );
  }
);

ContentCard.displayName = 'ContentCard';
export default ContentCard;
