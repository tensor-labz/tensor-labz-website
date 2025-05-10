import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroContext } from "../../../../contexts/HeroContext";

// Animation variants with consistent durations
const titleVariants = {
  initial: {
    opacity: 0,
    y: 20,
    textShadow: "1px 1px 1px grey"
  },
  animate: {
    opacity: 1,
    y: 0,
    textShadow: "none",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    textShadow: "1px 1px 1px grey",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Memoized component with performance optimizations
const HeroKeyPoint: React.FC = memo(() => {
  const { currentSlide, slider } = useHeroContext();

  return (
    <div className="min-h-[60px] relative">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentSlide}
          variants={titleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-2xl lg:text-4xl lg:text-justify text-center font-bold text-blue-900 drop-shadow-lg absolute w-full"
        >
          {slider?.title}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
});

// Add display name for better debugging
HeroKeyPoint.displayName = 'HeroKeyPoint';

export default HeroKeyPoint;