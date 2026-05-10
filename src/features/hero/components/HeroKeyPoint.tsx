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
    <div className="min-h-[60px] relative">
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          variants={titleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-xl md:text-2xl lg:text-3xl font-semibold absolute w-full text-center lg:text-left text-fg"
        >
          {slide?.title as string}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
});

HeroKeyPoint.displayName = 'HeroKeyPoint';
export default HeroKeyPoint;
