import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactIcon from './ReactIcon';
import { EASE_EXPO } from '../../../lib/motion';
import { toYouTubeEmbed, coverThumbnail } from '../../../services/postService';

export interface MediaItem {
  id: string | number;
  type: 'image' | 'youtube' | 'video' | 'drive_image' | 'drive_video';
  url: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
  title?: string;
}

const isImage = (type: MediaItem['type']) =>
  type === 'image' || type === 'drive_image';

/* Render one media item per its type, inside the shared display frame. */
const MediaFrame = ({ item }: { item: MediaItem }) => {
  if (item.type === 'youtube')
    return (
      <iframe
        src={toYouTubeEmbed(item.url)}
        title="media"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  if (item.type === 'drive_video')
    return (
      <iframe
        src={item.url}
        title="media"
        className="h-full w-full"
        allow="autoplay"
        allowFullScreen
      />
    );
  if (item.type === 'video')
    return (
      <video
        src={item.url}
        controls
        className="h-full w-full bg-black object-contain"
      />
    );
  return (
    <img src={item.url} alt="media" className="h-full w-full object-contain" />
  );
};

/**
 * Shared media gallery — a single slider over ALL media (images + videos).
 * Each slide renders with a type-appropriate frame; the thumbnail strip mixes
 * images and videos (videos badged with a play icon). Used by the post and
 * project detail pages.
 */
const MediaGallery: React.FC<MediaGalleryProps> = memo(
  ({ media, title = '◈ Media Gallery' }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (media.length === 0) return null;

    const index = Math.min(activeIndex, media.length - 1);
    const active = media[index];
    const go = (delta: number) =>
      setActiveIndex((p) => (p + delta + media.length) % media.length);

    return (
      <section className="mt-12 border-t border-rim pt-8">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          {title}
        </p>

        <div className="space-y-4">
          {/* Unified viewer */}
          <div className="border-accent/20 relative aspect-video overflow-hidden rounded-xl border bg-raised">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_EXPO }}
              >
                <MediaFrame item={active} />
              </motion.div>
            </AnimatePresence>

            {/* Engineering grid overlay (clicks pass through to controls) */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Type badge — frame feature differs per media type */}
            <div className="pointer-events-none absolute left-3 top-3">
              <span className="text-accent/80 border-accent/20 flex items-center gap-1 rounded border bg-black/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest">
                <ReactIcon
                  name={isImage(active.type) ? 'FiImage' : 'FiPlay'}
                  size={10}
                />
                {active.type}
              </span>
            </div>

            {/* Navigation across all media */}
            {media.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous media"
                  className="border-accent/30 hover:border-accent/60 absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-black/50 text-white transition-all duration-200 hover:bg-black/70"
                >
                  <ReactIcon name="FiChevronLeft" size={16} />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next media"
                  className="border-accent/30 hover:border-accent/60 absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-black/50 text-white transition-all duration-200 hover:bg-black/70"
                >
                  <ReactIcon name="FiChevronRight" size={16} />
                </button>
              </>
            )}

            {/* Index label */}
            <div className="pointer-events-none absolute bottom-3 right-3">
              <span className="text-accent/80 border-accent/20 rounded border bg-black/50 px-2 py-0.5 font-mono text-[9px]">
                {index + 1} / {media.length}
              </span>
            </div>
          </div>

          {/* Mixed thumbnail strip */}
          {media.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {media.map((item, i) => {
                const thumb = isImage(item.type)
                  ? item.url
                  : coverThumbnail(item.url, item.type);
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Media ${i + 1}`}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${i === index ? 'border-accent' : 'hover:border-accent/40 border-rim'}`}
                  >
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={`Thumb ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-900" />
                    )}
                    {!isImage(item.type) && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <ReactIcon
                          name="FiPlay"
                          size={12}
                          className="text-white"
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }
);

MediaGallery.displayName = 'MediaGallery';
export default MediaGallery;
