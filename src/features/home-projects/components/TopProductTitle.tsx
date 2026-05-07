import React, { memo } from 'react';
import { motion } from 'motion/react';

type TopProductTitleProps = {
  title?: string;
  subtitle?: string;
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 10, skewY: 5 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const TopProductTitle: React.FC<TopProductTitleProps> = memo(
  ({
    title = 'Innovating in 3D Modeling, Embedded Systems & IoT',
    subtitle = 'Tensor Labs — Pioneering Next-Gen Tech Solutions',
  }) => {
    return (
      <div className="w-full flex flex-col items-center">
        <motion.h3
          className="text-3xl md:text-4xl text-center font-extrabold text-slate-50"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {Array.from(title).map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={charVariants}
              className="inline-block mx-1 text-blue-500"
            >
              {char}
            </motion.span>
          ))}
        </motion.h3>
        <motion.p
          className="mt-2 text-slate-300 text-sm md:text-base text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      </div>
    );
  }
);

TopProductTitle.displayName = 'TopProductTitle';
export default TopProductTitle;
