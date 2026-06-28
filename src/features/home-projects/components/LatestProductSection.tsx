import React, { memo, useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Section from '../../../shared/components/ui/Section';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { useLatestProjectsController } from '../hooks/useLatestProjectsController';
import { useSiteSettings } from '../../../shared/hooks/useSiteSettings';
import { EASE_EXPO, VIEWPORT } from '../../../lib/motion';
import type { ProjectItem } from '../../../shared/types/project';

/* ─────────────────────────────────────────────
   MARQUEE CARD  (desktop)
───────────────────────────────────────────── */
const MarqueeCard = memo(
  ({
    title,
    imageURL,
    slug,
  }: Pick<ProjectItem, 'title' | 'imageURL' | 'slug'>) => {
    const navigate = useNavigate();
    return (
      <div
        onClick={() => navigate(`/project/${slug}`)}
        className="group relative w-[280px] shrink-0 rounded-xl overflow-hidden cursor-pointer
        border border-rim hover:border-accent/50
        transition-all duration-300 hover:shadow-[0_8px_32px_-8px_rgba(56,189,248,0.2)] bg-surface"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={imageURL}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="px-3 py-2.5 flex items-center justify-between gap-2 relative z-10">
          <h5
            className="text-sm font-semibold font-display text-fg truncate leading-snug
          group-hover:text-accent transition-colors duration-200"
          >
            {title}
          </h5>
          <ReactIcon
            name="FiArrowRight"
            size={13}
            className="text-muted shrink-0 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200"
          />
        </div>
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
  }
);
MarqueeCard.displayName = 'MarqueeCard';

/* ─────────────────────────────────────────────
   MARQUEE TRACK  (desktop)
───────────────────────────────────────────── */
const MarqueeTrack = ({
  projects,
  direction,
}: {
  projects: ProjectItem[];
  direction: 'left' | 'right';
}) => (
  <div
    className={`flex gap-4 w-max
      ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
      hover:[animation-play-state:paused]`}
  >
    {[...projects, ...projects].map((p, i) => (
      <MarqueeCard
        key={`${p.id}-${i}`}
        title={p.title}
        imageURL={p.imageURL}
        slug={p.slug}
      />
    ))}
  </div>
);

const SkeletonRow = () => (
  <div className="flex gap-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="w-[280px] shrink-0 rounded-xl bg-surface border border-rim animate-pulse"
      >
        <div className="aspect-video bg-raised" />
        <div className="h-9 bg-raised m-3 rounded" />
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   MOBILE SLIDER
───────────────────────────────────────────── */
const MobileSlider = memo(({ projects }: { projects: ProjectItem[] }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (projects.length <= 1) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex((p) => (p + 1) % projects.length);
    }, 6000);
    return () => clearInterval(t);
  }, [projects.length]);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };
  const prev = () => go((index - 1 + projects.length) % projects.length);
  const next = () => go((index + 1) % projects.length);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 260 : -260, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: EASE_EXPO },
    },
    exit: (d: number) => ({
      x: d > 0 ? -260 : 260,
      opacity: 0,
      transition: { duration: 0.35 },
    }),
  };

  if (projects.length === 0)
    return (
      <div className="w-full rounded-xl bg-surface border border-rim animate-pulse">
        <div className="aspect-video bg-raised rounded-t-xl" />
        <div className="h-10 bg-raised m-3 rounded" />
      </div>
    );

  const p = projects[index];

  return (
    <div
      className="relative w-full select-none"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) {
          if (dx < 0) next();
          else prev();
        }
        touchStartX.current = null;
      }}
    >
      {/* Card */}
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="group relative w-full rounded-xl overflow-hidden cursor-pointer
              border border-rim bg-surface"
            onClick={() => navigate(`/project/${p.slug}`)}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={p.imageURL}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            {/* Live badge */}
            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded
              border border-accent/40 bg-black/60 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest uppercase text-accent">
                Project
              </span>
            </div>
            {/* Title strip */}
            <div className="px-4 py-3 flex items-center justify-between gap-2 relative z-10">
              <h5 className="text-sm font-semibold font-display text-fg truncate">
                {p.title}
              </h5>
              <ReactIcon
                name="FiArrowRight"
                size={14}
                className="text-accent shrink-0"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next buttons */}
      {projects.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-[45%] -translate-y-1/2 w-8 h-8 rounded-full
              bg-black/50 border border-accent/30 text-white flex items-center justify-center
              hover:bg-black/70 hover:border-accent/60 transition-all duration-200 z-20"
          >
            <ReactIcon name="FiChevronLeft" size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-[45%] -translate-y-1/2 w-8 h-8 rounded-full
              bg-black/50 border border-accent/30 text-white flex items-center justify-center
              hover:bg-black/70 hover:border-accent/60 transition-all duration-200 z-20"
          >
            <ReactIcon name="FiChevronRight" size={16} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300
                ${i === index ? 'w-6 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-rim hover:bg-accent/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});
MobileSlider.displayName = 'MobileSlider';

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
const LatestProductSection: React.FC = memo(() => {
  const { topProjects } = useLatestProjectsController();
  const { get } = useSiteSettings();
  const row2 = useMemo(() => [...topProjects].reverse(), [topProjects]);
  const ready = topProjects.length > 0;

  return (
    <Section className="min-h-dvh flex flex-col justify-center py-16 sm:py-24 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
        className="text-center mb-10 px-6 lg:px-16"
      >
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent mb-3">
          {get('projects.label')}
        </p>
        <h2 className="text-2xl sm:text-4xl font-bold font-display text-fg">
          {get('projects.title')}
        </h2>
        <p className="text-muted text-base mt-2">
          {get('projects.description')}
        </p>
      </motion.div>

      {/* ── Mobile: single-card slider ── */}
      <div className="lg:hidden px-6">
        <MobileSlider projects={topProjects} />
      </div>

      {/* ── Desktop: dual-row marquee ── */}
      <div className="hidden lg:block px-6 lg:px-16">
        <div
          className="w-full flex flex-col gap-4"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="overflow-hidden">
            {ready ? (
              <MarqueeTrack projects={topProjects} direction="left" />
            ) : (
              <SkeletonRow />
            )}
          </div>
          <div className="overflow-hidden">
            {ready ? (
              <MarqueeTrack projects={row2} direction="right" />
            ) : (
              <SkeletonRow />
            )}
          </div>
        </div>
      </div>

      {/* View all */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-10 px-6 lg:px-16"
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
