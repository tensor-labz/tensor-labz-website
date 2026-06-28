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
        className={`group relative flex flex-col overflow-hidden rounded-xl
        bg-surface border border-rim cursor-pointer
        hover:border-accent/40 hover:shadow-[0_8px_40px_-8px_rgba(56,189,248,0.12)]
        transition-all duration-300 md:h-56
        ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
        {/* ── Cover ── */}
        <div className="relative h-40 sm:h-48 md:h-auto md:w-[38%] md:shrink-0 overflow-hidden bg-raised">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ReactIcon
                name="FaNewspaper"
                size={40}
                className="text-muted/20"
              />
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
            ${
              reverse
                ? 'md:bg-gradient-to-l md:from-slate-950/25 md:to-transparent'
                : 'md:bg-gradient-to-r md:from-transparent md:to-slate-950/25'
            }`}
          />
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-4 md:p-6 gap-2.5 md:justify-center">
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
                <span className="text-[10px] font-mono text-muted/50 self-center">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}

          <h2
            className="text-sm md:text-base lg:text-lg font-bold font-display text-fg leading-snug
          group-hover:text-accent transition-colors duration-200 line-clamp-2"
          >
            {title}
          </h2>

          {description && (
            <p className="text-[13px] md:text-sm text-muted leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          <div className="hidden md:block h-px bg-gradient-to-r from-accent/20 via-rim to-transparent" />

          <div className="flex items-center justify-between pt-2 md:pt-0 border-t border-rim md:border-0 mt-auto md:mt-0">
            <span className="text-[10px] font-mono text-muted/50">{date}</span>
            <ReactIcon
              name="FiArrowRight"
              size={14}
              className="text-accent/70 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
            />
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
  }
);

ContentCard.displayName = 'ContentCard';
export default ContentCard;
