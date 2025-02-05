import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroContext } from "../../../../contexts/HeroContext";

// Animation variants for consistent and reusable animations
const titleVariants = {
  initial: { 
    opacity: 0, 
    // rotateX: -45, 
    textShadow: "1px 1px 1px grey" 
  },
  animate: { 
    opacity: 1, 
    // rotateX: 0, 
    textShadow: "none",
    transition: {
      duration: 2.3,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0, 
    // rotateX: 45, 
    textShadow: "1px 1px 1px grey" 
  }
};

// Memoized component with performance optimizations
const HeroKeyPoint: React.FC = memo(() => {
  const { currentSlide, slider } = useHeroContext();

  return (
    <AnimatePresence mode="wait">
      <motion.h1 
        key={currentSlide}
        variants={titleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-2xl lg:text-4xl lg:text-justify text-center font-bold text-blue-900 drop-shadow-lg"
      >
        {slider.title}
      </motion.h1>
    </AnimatePresence>
  );
});

// Add display name for better debugging
HeroKeyPoint.displayName = 'HeroKeyPoint';

export default HeroKeyPoint;