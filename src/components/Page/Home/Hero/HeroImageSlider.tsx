import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroContext } from "../../../../contexts/HeroContext";

// Memoized component with performance optimizations
const HeroImageSlider: React.FC = memo(() => {
  const { currentSlide, slider } = useHeroContext();

  // Animation variants with consistent durations
  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      x: -50,
      zIndex: 1
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      zIndex: 2,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      x: 50,
      zIndex: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden min-h-[500px]" >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full absolute inset-0"
        >
          {/* Make sure slider.img is defined */}
          {slider && slider.img && (
            <img
              src={slider.img}
              alt={`Hero Image ${slider.title || ''}`}
              className="w-full h-full object-fill object-center"
              draggable={false}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

// Add display name for better debugging
HeroImageSlider.displayName = 'HeroImageSlider';

export default HeroImageSlider;