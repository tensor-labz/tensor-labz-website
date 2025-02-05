import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroContext } from "../../../../contexts/HeroContext";



// Memoized component with performance optimizations
const HeroImageSlider: React.FC = memo(() => {
  const { currentSlide, slider } = useHeroContext();

  // Animation variants for consistent and reusable animations
  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      x: -100,
      // rotateY: 10,
      zIndex: 1
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      // rotateY: 0,
      zIndex: 2,
      transition: {
        duration: 2.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      x: 100,
      // rotateY: -10,
      zIndex: 1,
      transition: {
        duration: 2.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlide}
        variants={imageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full min-h-full relative overflow-hidden"
      >
        <motion.img
          src={slider.img}
          alt={`Hero Image ${slider.title}`}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>
    </AnimatePresence>
  );
});

// Add display name for better debugging
HeroImageSlider.displayName = 'HeroImageSlider';

export default HeroImageSlider;