import React, { memo } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

// Enhanced type definition for more precise prop typing
interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  animation?: {
    initial?: HTMLMotionProps<'div'>['initial'];
    whileHover?: HTMLMotionProps<'div'>['whileHover'];
    whileTap?: HTMLMotionProps<'div'>['whileTap'];
    transition?: HTMLMotionProps<'div'>['transition'];
    viewport?: HTMLMotionProps<'div'>['viewport'];
    whileInView?: HTMLMotionProps<'div'>['whileInView'];
  };
}

// Default animation variants
const defaultAnimationVariants: CardProps['animation'] = {
  initial: { opacity: 0, x: -50 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" 
  },
  viewport: { 
    once: true, 
    amount: 0.1 
  },
  whileInView: { 
    opacity: 1, 
    x: 0 
  }
};

const Card: React.FC<CardProps> = memo(({
  children, 
  className = '', 
  animation = defaultAnimationVariants,
  ...rest
}) => {
  // Merge default and custom animations
  const mergedAnimation = {
    ...defaultAnimationVariants,
    ...animation
  };

  return (
    <motion.div
      initial={mergedAnimation.initial}
      whileHover={mergedAnimation.whileHover}
      whileTap={mergedAnimation.whileTap}
      whileInView={mergedAnimation.whileInView}
      viewport={mergedAnimation.viewport}
      transition={mergedAnimation.transition}
      className={`group cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'AnimatedCard';

export default Card;