import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector } from '../../../app/hooks';
import {
  selectCurrentIndex,
  selectCurrentSlide,
  selectHeroSlides,
} from '../../../store/heroSlice';
import { EASE_EXPO } from '../../../lib/motion';

const POSITIONS = ['tl', 'tr', 'bl', 'br'] as const;
type CornerPos = (typeof POSITIONS)[number];

const cornerStyles: Record<CornerPos, string> = {
  tl: 'top-3 left-3 border-t border-l',
  tr: 'top-3 right-3 border-t border-r',
  bl: 'bottom-3 left-3 border-b border-l',
  br: 'bottom-3 right-3 border-b border-r',
};
const cornerDelays: Record<CornerPos, number> = {
  tl: 0.3,
  tr: 0.4,
  bl: 0.5,
  br: 0.6,
};

const CornerBracket = memo(({ pos }: { pos: CornerPos }) => (
  <motion.div
    className={`absolute w-5 h-5 border-accent/70 pointer-events-none z-30 ${cornerStyles[pos]}`}
    initial={{ opacity: 0, scale: 0.4 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: cornerDelays[pos], duration: 0.5, ease: EASE_EXPO }}
  />
));
CornerBracket.displayName = 'CornerBracket';

const HolographicFrame = memo(() => {
  const currentIndex = useAppSelector(selectCurrentIndex);
  const slide = useAppSelector(selectCurrentSlide);
  const slides = useAppSelector(selectHeroSlides);

  return (
    <div className="relative w-full h-full flex flex-col gap-2">
      {/* ── status bar ── */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-accent/70 select-none">
            TL.SYSTEMS
          </span>
        </div>
        <span className="text-[9px] font-mono text-muted/50 select-none">
          DISPLAY-{String(currentIndex + 1).padStart(3, '0')}
        </span>
      </div>

      {/* ── main frame ── */}
      <div className="relative flex-1 overflow-hidden rounded-xl border border-accent/20">
        {/* engineering grid overlay */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.035) 1px, transparent 1px), ' +
              'linear-gradient(90deg, rgba(56,189,248,0.035) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* corner brackets */}
        {POSITIONS.map((p) => (
          <CornerBracket key={p} pos={p} />
        ))}

        {/* slide image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_EXPO }}
          >
            {slide?.img ? (
              <img
                src={slide.img as string}
                alt={slide.title as string}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full bg-raised animate-pulse" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* gradient vignette */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50" />

        {/* scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, var(--accent) 40%, #fff 50%, var(--accent) 60%, transparent 100%)',
            opacity: 0.3,
            top: '0%',
          }}
          animate={{ top: ['0%', '100%'] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 2,
          }}
        />

        {/* bottom annotation */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-3 py-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={`ann-${currentIndex}`}
              className="text-[9px] font-mono tracking-[0.22em] uppercase text-accent/80 mb-1.5 select-none"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE_EXPO }}
            >
              ◈ {(slide?.title as string) || 'Loading…'}
            </motion.p>
          </AnimatePresence>

          {/* slide dots */}
          <div className="flex items-center gap-1.5">
            {slides.slice(0, 4).map((_, i) => (
              <motion.div
                key={i}
                className="h-0.5 rounded-full bg-accent"
                animate={{
                  width: i === currentIndex ? 22 : 6,
                  opacity: i === currentIndex ? 1 : 0.3,
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── footer bar ── */}
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[9px] font-mono text-muted/40 select-none">
          {'// FRAME'} {currentIndex + 1}/{slides.length || '—'}
        </span>
        <div className="flex items-center gap-1">
          <motion.div
            className="w-1 h-1 rounded-full bg-accent"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <span className="text-[9px] font-mono text-accent/60 select-none">
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
});

HolographicFrame.displayName = 'HolographicFrame';
export default HolographicFrame;
