import React from 'react';
import { motion, Variants } from 'motion/react';
import Section from '../../../../components/resuable/Section';

// Loading animation variants
const loadingVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const pulseVariants: Variants = {
  hidden: { opacity: 0.3, scale: 0.95 },
  visible: {
    opacity: 0.7,
    scale: 1,
    transition: {
      yoyo: Infinity,
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

const LoadingHeroPlaceholder: React.FC = () => {
  return (
    <Section
      className="relative bg-white dark:bg-gray-900
      text-gray-800 dark:text-gray-100 py-10 sm:py-20 md:py-18 lg:py-24 px-6 md:px-8 lg:px-12
      min-h-screen flex md:flex-row flex-col-reverse items-center justify-center gap-x-8 gap-y-4 overflow-hidden"
    >
      <motion.div
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex md:flex-row flex-col-reverse items-center justify-center gap-8"
      >
        {/* Placeholder Content */}
        <div className="lg:w-7/12 w-full z-20 relative">
          <motion.div
            variants={pulseVariants}
            className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"
          />
          <motion.div
            variants={pulseVariants}
            className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"
          />
          <motion.div
            variants={pulseVariants}
            className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mt-4"
          />
        </div>

        {/* Placeholder Image */}
        <motion.div
          variants={pulseVariants}
          className="lg:w-5/12 w-full h-80 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"
        />
      </motion.div>
    </Section>
  );
};
LoadingHeroPlaceholder.displayName = 'LoadingHeroPlaceholder';
export default LoadingHeroPlaceholder;
