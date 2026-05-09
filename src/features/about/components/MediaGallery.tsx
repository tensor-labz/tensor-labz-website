import { memo, useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAboutMedia } from '../hooks/useAboutMedia';
import type { MediaItem } from '../hooks/useAboutMedia';

/* Extract YouTube video ID from embed or watch URL */
function ytThumb(url: string): string | null {
  const m = url.match(/(?:embed\/|v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : null;
}

/* ── Single thumbnail ── */
const Thumb = memo(
  ({
    item,
    active,
    onClick,
  }: {
    item: MediaItem;
    active: boolean;
    onClick: () => void;
  }) => {
    const thumb = item.type === 'image' ? item.url : ytThumb(item.url);

    return (
      <button
        onClick={onClick}
        className="relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 focus:outline-none"
        style={{
          width: 110,
          height: 62,
          border: active
            ? '2px solid var(--accent)'
            : '2px solid var(--glass-border)',
          opacity: active ? 1 : 0.55,
        }}
        onMouseEnter={(e) =>
          !active && ((e.currentTarget as HTMLElement).style.opacity = '0.85')
        }
        onMouseLeave={(e) =>
          !active && ((e.currentTarget as HTMLElement).style.opacity = '0.55')
        }
      >
        {thumb ? (
          <img
            src={thumb}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--glass-bg-raised)' }}
          >
            <FaPlay size={14} style={{ color: 'var(--accent)' }} />
          </div>
        )}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
            >
              <FaPlay size={8} style={{ color: '#fff' }} />
            </div>
          </div>
        )}
        {active && (
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        )}
      </button>
    );
  }
);
Thumb.displayName = 'Thumb';

/* ── Featured player ── */
const FeaturedPlayer = memo(({ item }: { item: MediaItem }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      {item.type === 'video' ? (
        <iframe
          src={item.url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={item.title}
          style={{ border: 0 }}
        />
      ) : (
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      )}

      {/* Bottom title overlay */}
      {item.title && (
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-4"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
          }}
        >
          <p className="text-sm font-medium text-white truncate">
            {item.title}
          </p>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
));
FeaturedPlayer.displayName = 'FeaturedPlayer';

/* ── Skeleton ── */
const Skeleton = () => (
  <div className="w-full space-y-4">
    <div
      className="w-full rounded-2xl animate-pulse"
      style={{
        paddingBottom: '56.25%',
        backgroundColor: 'var(--glass-bg-raised)',
        border: '1px solid var(--glass-border)',
      }}
    />
    <div className="flex gap-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="shrink-0 rounded-xl animate-pulse"
          style={{
            width: 110,
            height: 62,
            backgroundColor: 'var(--glass-bg-raised)',
          }}
        />
      ))}
    </div>
  </div>
);

/* ── MediaGallery ── */
const MediaGallery = memo(() => {
  const { items, loading } = useAboutMedia();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((cur) => {
        let next: number;
        do {
          next = Math.floor(Math.random() * items.length);
        } while (next === cur && items.length > 1);
        return next;
      });
    }, 5000);
  };

  useEffect(() => {
    if (paused || items.length <= 1) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, paused]);

  if (loading) return <Skeleton />;
  if (items.length === 0) return null;

  const prev = () => {
    setActive((i) => (i - 1 + items.length) % items.length);
    resetTimer();
  };
  const next = () => {
    setActive((i) => (i + 1) % items.length);
    resetTimer();
  };

  return (
    <div className="w-full">
      {/* ── Featured frame ── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          paddingBottom: '56.25%',
          border: '1px solid var(--glass-border)',
          backgroundColor: '#000',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <FeaturedPlayer item={items[active]} />

        {/* Prev / Next arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 z-10"
              style={{
                backgroundColor: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  'var(--accent)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  'rgba(0,0,0,0.45)')
              }
            >
              <FaChevronLeft size={11} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 z-10"
              style={{
                backgroundColor: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  'var(--accent)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  'rgba(0,0,0,0.45)')
              }
            >
              <FaChevronRight size={11} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {items.length > 1 && (
          <div className="absolute top-3 right-3 flex gap-1.5 z-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  resetTimer();
                }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === active ? 16 : 6,
                  height: 6,
                  backgroundColor:
                    i === active ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {items.length > 1 && (
        <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {items.map((item, i) => (
            <Thumb
              key={item.id}
              item={item}
              active={i === active}
              onClick={() => {
                setActive(i);
                resetTimer();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

MediaGallery.displayName = 'MediaGallery';
export default MediaGallery;
