import React, { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector } from '../../../app/hooks';
import {
  selectCurrentIndex,
  selectCurrentSlide,
} from '../../../store/heroSlice';

const imageVariants = {
  initial: { opacity: 0, scale: 0.95, x: -50 },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    x: 50,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const HeroImageSlider: React.FC = memo(() => {
  const currentIndex = useAppSelector(selectCurrentIndex);
  const slide = useAppSelector(selectCurrentSlide);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          {slide?.img && (
            <img
              src={slide.img}
              alt={slide.title ?? 'Hero'}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

HeroImageSlider.displayName = 'HeroImageSlider';
export default HeroImageSlider;
