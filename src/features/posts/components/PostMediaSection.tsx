import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { EASE_EXPO } from '../../../lib/motion';
import { toYouTubeEmbed, PostAdditionalMedia } from '../../../services/postService';

interface Props {
  media: PostAdditionalMedia[];
}

const isImage = (type: PostAdditionalMedia['type']) =>
  type === 'image' || type === 'drive_image';

const PostMediaSection: React.FC<Props> = memo(({ media }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = media.filter((m) => isImage(m.type));
  const videos = media.filter((m) => !isImage(m.type));

  if (media.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-rim">
      <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-accent mb-6">
        ◈ Media Gallery
      </p>

      {/* Video players */}
      {videos.length > 0 && (
        <div className="space-y-4 mb-6">
          {videos.map((item, i) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden border border-accent/20 aspect-video"
            >
              {item.type === 'youtube' ? (
                <iframe
                  src={toYouTubeEmbed(item.url)}
                  title={`Video ${i + 1}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : item.type === 'drive_video' ? (
                <iframe
                  src={item.url}
                  title={`Video ${i + 1}`}
                  className="w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image gallery */}
      {images.length > 0 && (
        <div className="space-y-4">
          {/* Main image viewer */}
          <div className="relative rounded-xl overflow-hidden border border-accent/20 bg-raised aspect-video">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={images[activeIndex].url}
                alt={`Media ${activeIndex + 1}`}
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_EXPO }}
              />
            </AnimatePresence>

            {/* Engineering grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIndex((p) => (p - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                    bg-black/50 border border-accent/30 text-white flex items-center justify-center
                    hover:bg-black/70 hover:border-accent/60 transition-all duration-200"
                >
                  <ReactIcon name="FiChevronLeft" size={16} />
                </button>
                <button
                  onClick={() => setActiveIndex((p) => (p + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                    bg-black/50 border border-accent/30 text-white flex items-center justify-center
                    hover:bg-black/70 hover:border-accent/60 transition-all duration-200"
                >
                  <ReactIcon name="FiChevronRight" size={16} />
                </button>
              </>
            )}

            {/* Index label */}
            <div className="absolute bottom-3 right-3">
              <span className="text-[9px] font-mono text-accent/80 bg-black/50 px-2 py-0.5 rounded border border-accent/20">
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {images.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0
                    ${i === activeIndex ? 'border-accent' : 'border-rim hover:border-accent/40'}`}
                >
                  <img src={item.url} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
});

PostMediaSection.displayName = 'PostMediaSection';
export default PostMediaSection;
