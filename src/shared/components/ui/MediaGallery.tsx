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
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  if (item.type === 'drive_video')
    return (
      <iframe
        src={item.url}
        title="media"
        className="w-full h-full"
        allow="autoplay"
        allowFullScreen
      />
    );
  if (item.type === 'video')
    return (
      <video
        src={item.url}
        controls
        className="w-full h-full object-contain bg-black"
      />
    );
  return (
    <img src={item.url} alt="media" className="w-full h-full object-contain" />
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
      <section className="mt-12 pt-8 border-t border-rim">
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-accent mb-6">
          {title}
        </p>

        <div className="space-y-4">
          {/* Unified viewer */}
          <div className="relative rounded-xl overflow-hidden border border-accent/20 bg-raised aspect-video">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="w-full h-full"
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
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Type badge — frame feature differs per media type */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-accent/80 bg-black/50 px-2 py-0.5 rounded border border-accent/20">
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                    bg-black/50 border border-accent/30 text-white flex items-center justify-center
                    hover:bg-black/70 hover:border-accent/60 transition-all duration-200"
                >
                  <ReactIcon name="FiChevronLeft" size={16} />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next media"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                    bg-black/50 border border-accent/30 text-white flex items-center justify-center
                    hover:bg-black/70 hover:border-accent/60 transition-all duration-200"
                >
                  <ReactIcon name="FiChevronRight" size={16} />
                </button>
              </>
            )}

            {/* Index label */}
            <div className="absolute bottom-3 right-3 pointer-events-none">
              <span className="text-[9px] font-mono text-accent/80 bg-black/50 px-2 py-0.5 rounded border border-accent/20">
                {index + 1} / {media.length}
              </span>
            </div>
          </div>

          {/* Mixed thumbnail strip */}
          {media.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {media.map((item, i) => {
                const thumb = isImage(item.type)
                  ? item.url
                  : coverThumbnail(item.url, item.type);
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Media ${i + 1}`}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0
                      ${i === index ? 'border-accent' : 'border-rim hover:border-accent/40'}`}
                  >
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={`Thumb ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900" />
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
