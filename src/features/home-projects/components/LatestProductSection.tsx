import React, { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Section from '../../../shared/components/ui/Section';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { useLatestProjectsController } from '../hooks/useLatestProjectsController';
import { EASE_EXPO, VIEWPORT } from '../../../lib/motion';
import type { ProjectItem } from '../../../shared/types/project';

/* ── Single marquee card ── */
const MarqueeCard = memo(({ title, imageURL, slug }: Pick<ProjectItem, 'title' | 'imageURL' | 'slug'>) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/project/${slug}`)}
      className="group relative w-[280px] shrink-0 rounded-xl overflow-hidden cursor-pointer
        border border-rim hover:border-accent/50
        transition-all duration-300 hover:shadow-[0_8px_32px_-8px_rgba(56,189,248,0.2)]
        bg-surface"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={imageURL}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Engineering grid on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Title strip */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2 relative z-10">
        <h5 className="text-sm font-semibold font-display text-fg truncate leading-snug
          group-hover:text-accent transition-colors duration-200">
          {title}
        </h5>
        <ReactIcon
          name="FiArrowRight"
          size={13}
          className="text-muted shrink-0 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200"
        />
      </div>

      {/* Corner brackets */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
        <div
          key={pos}
          className={`absolute w-3 h-3 border-accent/50 pointer-events-none z-10
            opacity-0 group-hover:opacity-100 transition-all duration-300
            ${pos === 'tl' ? 'top-1.5 left-1.5 border-t border-l' : ''}
            ${pos === 'tr' ? 'top-1.5 right-1.5 border-t border-r' : ''}
            ${pos === 'bl' ? 'bottom-1.5 left-1.5 border-b border-l' : ''}
            ${pos === 'br' ? 'bottom-1.5 right-1.5 border-b border-r' : ''}`}
        />
      ))}
    </div>
  );
});
MarqueeCard.displayName = 'MarqueeCard';

/* ── Marquee track ── */
const MarqueeTrack = ({ projects, direction }: { projects: ProjectItem[]; direction: 'left' | 'right' }) => {
  const doubled = [...projects, ...projects];
  return (
    <div
      className={`flex gap-4 w-max
        ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
        hover:[animation-play-state:paused]`}
    >
      {doubled.map((p, i) => (
        <MarqueeCard key={`${p.id}-${i}`} title={p.title} imageURL={p.imageURL} slug={p.slug} />
      ))}
    </div>
  );
};

const SkeletonRow = () => (
  <div className="flex gap-4 px-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="w-[280px] shrink-0 rounded-xl bg-surface border border-rim animate-pulse">
        <div className="aspect-video bg-raised" />
        <div className="h-9 bg-raised m-3 rounded" />
      </div>
    ))}
  </div>
);

/* ── Section ── */
const LatestProductSection: React.FC = memo(() => {
  const { topProjects } = useLatestProjectsController();
  const row2 = useMemo(() => [...topProjects].reverse(), [topProjects]);
  const ready = topProjects.length > 0;

  return (
    <Section className="py-16 sm:py-24 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
        className="text-center mb-10 px-6"
      >
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent mb-3">◈ Featured Work</p>
        <h2 className="text-2xl sm:text-4xl font-bold font-display text-fg">Our Latest Projects</h2>
        <p className="text-muted text-base mt-2">Selected engineering projects and innovations.</p>
      </motion.div>

      {/* Marquee rows — edge fade via mask */}
      <div
        className="w-full flex flex-col gap-4"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
      >
        <div className="overflow-hidden">
          {ready ? <MarqueeTrack projects={topProjects} direction="left" /> : <SkeletonRow />}
        </div>
        <div className="overflow-hidden">
          {ready ? <MarqueeTrack projects={row2} direction="right" /> : <SkeletonRow />}
        </div>
      </div>

      {/* View all */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-10"
      >
        <a
          href="/services/all"
          className="inline-flex items-center gap-2 text-sm font-mono text-accent/70
            hover:text-accent transition-colors duration-200"
        >
          View all projects
          <ReactIcon name="FiArrowRight" size={13} />
        </a>
      </motion.div>
    </Section>
  );
});

LatestProductSection.displayName = 'LatestProductSection';
export default LatestProductSection;
