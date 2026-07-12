import React, { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector } from '../../../app/hooks';
import {
  selectCurrentIndex,
  selectCurrentSlide,
} from '../../../store/heroSlice';

const titleVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.5, ease: 'easeOut' } },
};

const HeroKeyPoint: React.FC = memo(() => {
  const currentIndex = useAppSelector(selectCurrentIndex);
  const slide = useAppSelector(selectCurrentSlide);

  return (
    <div className="relative min-h-[60px]">
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          variants={titleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute w-full text-center text-xl font-semibold text-fg md:text-2xl lg:text-left lg:text-3xl"
        >
          {slide?.title as string}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
});

HeroKeyPoint.displayName = 'HeroKeyPoint';
export default HeroKeyPoint;
